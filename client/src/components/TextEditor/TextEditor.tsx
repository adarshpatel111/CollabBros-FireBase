import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, set } from "firebase/database";
import { db } from "../FireBase/FireBaseConfig";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python"; // Python mode
import "codemirror/mode/htmlmixed/htmlmixed"; // HTML mixed mode
import "./TextEditor.css";
// For optional features like matching brackets and linting
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/lint/lint";
import "codemirror/addon/display/placeholder";
import {
  Stack,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import GenerateButton from "../GenrateButton/GenrateButton";
import { toast } from "react-hot-toast";

const themes = [
  { value: "dracula", label: "Dracula" },
  { value: "material", label: "Material" },
  { value: "eclipse", label: "Eclipse" },
];

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "htmlmixed", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "markdown", label: "Markdown" },
];

const TextEditor: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("dracula");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [roomLink, setRoomLink] = useState<string>("");
  const [isRoomFound, setIsRoomFound] = useState<boolean>(true);
  const VITE_APP_FRONTEND_URL = import.meta.env.VITE_APP_FRONTEND_URL;
  useEffect(() => {
    if (roomId) {
      const roomRef = ref(db, `rooms/${roomId}`);
      get(roomRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setIsRoomFound(true);
            const roomDataRef = ref(db, `rooms/${roomId}/data`);
            get(roomDataRef).then((dataSnapshot) => {
              if (dataSnapshot.exists()) {
                setCode(dataSnapshot.val());
              } else {
                setCode("");
              }
            });
          } else {
            setIsRoomFound(false);
            toast.error("Room not found!");
            setCode("");
          }
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
          setIsRoomFound(false);
        });
    }
  }, [roomId]);

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (roomId) {
      const roomRef = ref(db, `rooms/${roomId}/data`);
      set(roomRef, value);
    }
  };

  const generateRoomCode = (): string => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let roomCode = "";
    for (let i = 0; i < 5; i++) {
      roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomCode;
  };

  const handleGenerateRoom = () => {
    const roomCode = generateRoomCode();
    const roomData = { data: "" };

    set(ref(db, `rooms/${roomCode}`), roomData)
      .then(() => {
        const generatedLink = `${VITE_APP_FRONTEND_URL}/room/${roomCode}`;
        setRoomLink(generatedLink);
        setOpenDialog(true);
      })
      .catch((error) => {
        console.error("Error creating room:", error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {roomId && <h2>Room Code: {roomId}</h2>}

      {/* Conditional Rendering for Room Not Found */}
      {!isRoomFound ? (
        <Stack sx={{ textAlign: "center", marginBottom: "20px", gap: "10px" }}>
          <h2>Room Not Found</h2>
        </Stack>
      ) : (
        <>
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              marginTop: { xs: "1rem", md: "1rem" },
              marginBottom: { xs: "1rem", md: "1rem" },
              justifyContent: "space-between",
            }}
          >
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Theme"
                defaultValue="dracula"
                helperText="Please select your theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {themes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Language"
                defaultValue="javascript"
                helperText="Please select your language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Generated Link</DialogTitle>
                <DialogContent>
                  <div>
                    <span>Click the link below to join the room:</span>
                  </div>
                  <a href={roomLink} target="_blank" rel="noopener noreferrer">
                    {roomLink}
                  </a>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Stack sx={{ width: { xs: "60%", md: "auto" } }}>
                <GenerateButton
                  onClick={handleGenerateRoom}
                  btnName={"Generate Room"}
                />
              </Stack>
            </Stack>
          </Stack>

          <CodeMirror
            value={code}
            options={{
              mode: language,
              theme: theme,
              lineNumbers: true,
              lineWrapping: true,
              autoCloseBrackets: true,
              autoCloseTags: true,
              styleActiveLine: true,
              tabSize: 2,
              indentWithTabs: true,
              lint: true,
              matchBrackets: true,
              matchTags: true,
              autoMatchParens: true,
              extraKeys: {
                "Ctrl-/": "toggleComment",
              },
              placeholder: "Write your code here...",
            }}
            onBeforeChange={(editor, data, value) => {
              handleCodeChange(value);
            }}
          />
        </>
      )}
    </>
  );
};

export default TextEditor;
