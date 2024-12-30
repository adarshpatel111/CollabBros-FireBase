import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get, set, onValue } from "firebase/database";
import { db } from "../FireBase/FireBaseConfig";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python"; // Python mode
import "codemirror/mode/htmlmixed/htmlmixed"; // HTML mixed mode
import { marked } from "marked"; // Markdown rendering
import "./TextEditor.css";
import {
  Stack,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Tabs,
  Tab,
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
  const { roomId } = useParams<{ roomId: string }>();
  const [code, setCode] = useState<string>(""); // Code state for the editor
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("dracula");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [roomLink, setRoomLink] = useState<string>("");
  const [isRoomFound, setIsRoomFound] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 for Code, 1 for Preview
  const VITE_APP_FRONTEND_URL = import.meta.env.VITE_APP_FRONTEND_URL;

  useEffect(() => {
    if (roomId) {
      const roomRef = ref(db, `rooms/${roomId}`);
      get(roomRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setIsRoomFound(true);
            const roomDataRef = ref(db, `rooms/${roomId}/data`);
            onValue(roomDataRef, (snapshot) => {
              if (snapshot.exists()) {
                setCode(snapshot.val()); // Update code in the editor
              } else {
                setCode(""); // Empty code if no data
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
    setCode(value); // Update the local code state

    if (navigator.onLine) {
      if (roomId) {
        const roomRef = ref(db, `rooms/${roomId}/data`);
        set(roomRef, value); // Save to Firebase
      }
    } else {
      localStorage.setItem(`code-${roomId}`, value); // Store in localStorage if offline
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
                id="outlined-select-language"
                select
                label="Language"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setActiveTab(0); // Always switch to "Code" tab when language changes
                }}
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
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
                  <Button onClick={() => setOpenDialog(false)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Generate Room Button */}
              <GenerateButton onClick={() => {}} btnName={"Generate Room"} />
            </Stack>
          </Stack>

          {/* Conditionally render tabs based on selected language */}
          {language === "markdown" ? (
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Code" />
              <Tab label="Preview" />
            </Tabs>
          ) : (
            <Tabs value={0} disabled>
              <Tab label="Code" />
            </Tabs>
          )}

          {/* Render code editor or markdown preview */}
          {activeTab === 0 ? (
            // Code Editor
            <Stack sx={{ marginTop: "20px" }}>
              <CodeMirror
                value={code}
                options={{
                  mode: language,
                  theme: theme,
                  lineNumbers: true,
                  matchBrackets: true,
                  autoCloseBrackets: true,
                  styleActiveLine: true,
                  lint: true,
                  placeholder: "Start coding...",
                }}
                onBeforeChange={(editor, data, value) => {
                  handleCodeChange(value); // Handle code change
                }}
              />
            </Stack>
          ) : language === "markdown" ? (
            // Markdown Preview
            <div
              dangerouslySetInnerHTML={{
                __html: marked(code), // Render Markdown as HTML
              }}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default TextEditor;
