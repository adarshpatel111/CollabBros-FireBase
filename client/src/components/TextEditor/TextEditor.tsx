import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2"; // Import the wrapper for CodeMirror
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material"; // Material UI components
import {
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore"; // Firebase functions for Firestore
import { db } from "../FireBase/FireBaseConfig"; // Import Firestore instance
import "codemirror/lib/codemirror.css"; // Import CodeMirror's base styles
import "codemirror/theme/dracula.css"; // Dracula theme
import "codemirror/mode/javascript/javascript"; // JavaScript syntax highlighting
import "codemirror/mode/xml/xml"; // XML syntax highlighting
import "codemirror/mode/css/css"; // CSS syntax highlighting
import "codemirror/addon/edit/closebrackets"; // Close brackets
import "codemirror/addon/edit/closetag"; // Close tags
import "codemirror/addon/comment/comment"; // Commenting functionality
import "codemirror/addon/display/fullscreen"; // Fullscreen mode
import "codemirror/addon/selection/active-line"; // Active line highlighting
import "codemirror/addon/display/placeholder"; // Placeholder text
import "./TextEditor.css"; // Custom styles
import GenerateButton from "../GenrateButton/GenrateButton"; // Custom component for Generate button

// Define available themes and languages
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
  const [code, setCode] = useState<string>(""); // State for the code content
  const [language, setLanguage] = useState<string>("javascript"); // Language mode
  const [theme, setTheme] = useState<string>("dracula"); // Theme of the editor
  const [readOnly, setReadOnly] = useState<boolean>(false); // Editor's read-only state
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true); // Simulated online status
  const [openDialog, setOpenDialog] = useState<boolean>(false); // Dialog visibility state
  const [generatedLink, setGeneratedLink] = useState<string>(""); // Generated link for sharing
  const [roomCode, setRoomCode] = useState<string>(""); // Store the generated room code
  const [roomRef, setRoomRef] = useState<any>(null); // Reference to the room's Firestore document

  // Sync code to Firebase Firestore in real-time
  useEffect(() => {
    if (roomCode) {
      const docRef = doc(db, "rooms", roomCode); // Firestore document reference for the room

      // Listen to changes in Firestore (real-time sync)
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data && data.data) {
          setCode(data.data); // Sync Firestore data with the editor
        }
      });

      // Cleanup on component unmount
      return () => unsubscribe();
    }
  }, [roomCode]);

  // Handle code changes and update Firestore document
  const handleCodeChange = (value: string) => {
    setCode(value); // Update local state

    // Update Firebase Firestore with the new code content
    if (roomCode && roomRef) {
      setDoc(roomRef, { data: value }, { merge: true }); // Merge new data with the existing document
    }
  };

  // Handle generate room button click
  const handleGenerateLink = async () => {
    const randomRoomCode = `r${Math.random().toString(36).substr(2, 9)}`; // Generate a random room code
    setRoomCode(randomRoomCode);

    // Create the room document in Firestore
    const roomDocRef = await addDoc(collection(db, "rooms"), {
      room: randomRoomCode,
      data: "", // Initially blank content
    });

    // Set the room reference for real-time syncing
    setRoomRef(doc(db, "rooms", roomDocRef.id));

    // Generate and show the room link
    const newLink = `${
      import.meta.env.VITE_APP_FRONTEND_URL
    }/room/${randomRoomCode}`;
    setGeneratedLink(newLink); // Set the generated link state
    setOpenDialog(true); // Open the dialog with the generated link
  };

  return (
    <>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          marginTop: { xs: "0rem", md: "1rem" },
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <TextField
            id="outlined-select-theme"
            select
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            helperText="Please select your theme"
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
            onChange={(e) => setLanguage(e.target.value)}
            helperText="Please select your language"
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Online/Offline Indicator */}
          <Stack
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Stack
              sx={{
                position: "relative",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: onlineStatus ? "green" : "red",
              }}
            />
            <span style={{ color: onlineStatus ? "green" : "red" }}>
              {onlineStatus ? "Online" : "Offline"}
            </span>
          </Stack>
        </Stack>

        {/* Dialog to show generated link */}
        <Stack>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Generated Link</DialogTitle>
            <DialogContent>
              <p>Click the link below to join the room:</p>
              <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                {generatedLink}
              </a>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <GenerateButton
            onClick={handleGenerateLink}
            btnName={"Generate Room"}
          />
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
            "Ctrl-/": "toggleComment", // Toggle comment on Ctrl+/
          },
          placeholder: "Write your code here...",
        }}
        onBeforeChange={(editor, data, value) => handleCodeChange(value)} // Sync local changes to Firebase
      />
    </>
  );
};

export default TextEditor;
