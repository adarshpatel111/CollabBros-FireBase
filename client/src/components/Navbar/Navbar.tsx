import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
  IconButton,
} from "@mui/material";
import {
  ArrowForward,
  Undo,
  Redo,
  Home,
  KeyboardArrowDown,
  Pageview,
  Search,
  Code,
  Comment,
  Keyboard,
  FileCopy,
  SelectAll,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import ShortcutIcon from "@mui/icons-material/KeyboardAlt";
import QuestionMarkIcon from "@mui/icons-material/HelpOutline";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import HistoryIcon from "@mui/icons-material/History";
import CodeIcon from "@mui/icons-material/Code";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MicIcon from "@mui/icons-material/Mic";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CommentIcon from "@mui/icons-material/Comment";
import TranslateIcon from "@mui/icons-material/Translate";
import BarChartIcon from "@mui/icons-material/BarChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpButton from "../HelpButton/HelpButton";
// import HelpButton from "../HelpButton/HelpButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleOpenShortcuts = () => setOpenShortcuts(true);
  const handleOpenHelp = () => setOpenHelp(true);
  const handleClose = (e) => {
    e.stopPropagation();
    setOpenShortcuts(false);
    setOpenHelp(false);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Contact", path: "/contact" },
  ];
  // Transition for the Dialog
  const Transition = React.forwardRef(function Transition(
    props: any,
    ref: any
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Stack
      component="nav"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "1rem 2rem",
        width: "100%",
        alignItems: "center",
        top: 0,
        position: "sticky",
        zIndex: 1000,
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#f4f4f4",
          color: "#fff",
        },
      }}
    >
      <Stack
        sx={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">CollabBros</Typography>

        <Stack>
          {/* Desktop Navigation */}
          <Stack
            sx={{
              flexDirection: "row",
              gap: 2,
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <Typography
                component={Link}
                to={link.path}
                key={link.title + link.path}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#1976d2",
                  },
                }}
              >
                {link.title}
              </Typography>
            ))}

            {/* <Stack sx={{ flexDirection: "row", gap: 2 }}> */}
            {/* Help and Shortcuts buttons */}
            <HelpButton
              icons={<ShortcutIcon className="icon" sx={{ fontSize: 20 }} />}
              btnName="Shortcuts"
              onClick={handleOpenShortcuts}
            />
            <HelpButton
              icons={
                <QuestionMarkIcon className="icon" sx={{ fontSize: 20 }} />
              }
              btnName="Help"
              onClick={handleOpenHelp}
            />
            {/* </Stack> */}
          </Stack>

          {/* Menu toggle button for mobile */}
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={toggleMenu}
            color="inherit"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          {/* Mobile Menu */}
          {menuOpen && (
            <Stack
              sx={{
                flexDirection: "column",
                gap: "1rem",
                position: "absolute",
                top: "4rem",
                left: 0,
                margin: "0 auto",
                width: "100%",
                background: "white",
                borderRadius: "10px",
                paddingTop: "1rem",
                color: "white",
                zIndex: 10,
              }}
            >
              {/* Navigation links */}
              {navLinks.map((link) => (
                <Typography
                  component={Link}
                  to={link.path}
                  key={link.title + link.path}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "1.5rem",
                    textDecoration: "none",
                    marginLeft: "1rem",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#1976d2",
                    },
                  }}
                  onClick={() => setMenuOpen(false)} // Close menu after link click
                >
                  {link.title}
                </Typography>
              ))}

              {/* Help and Shortcuts buttons below the links */}
              <Stack
                sx={{textAlign:"left"}}
              >
                <HelpButton
                  btnName="Shortcuts"
                  onClick={handleOpenShortcuts}
                  icons={
                    <ShortcutIcon className="icon" sx={{ fontSize: 20 }} />
                  }
                />
                <HelpButton
                  btnName="Help"
                  onClick={handleOpenHelp}
                  icons={
                    <QuestionMarkIcon className="icon" sx={{ fontSize: 20 }} />
                  }
                />
              </Stack>
            </Stack>
          )}
        </Stack>

        {/* Modal Dialog for CodeMirror Shortcuts with Animation */}
        <Dialog
          open={openShortcuts}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          sx={{
            "& .MuiDialog-paper": {
              animation: "fadeIn 0.5s ease-out",
            },
          }}
        >
          <DialogTitle>CodeMirror Keyboard Shortcuts</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
              Here are the available CodeMirror shortcuts:
            </Typography>

            {/* Grid to display each shortcut with icons */}
            <Grid container spacing={2}>
              {shortcuts.map((shortcut, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <shortcut.icon
                      sx={{ fontSize: 24, color: shortcut.iconColor }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: "500" }}>
                      <strong>{shortcut.key}</strong>: {shortcut.description}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* Modal Dialog for Help with Instructions */}
        <Dialog
          open={openHelp}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          sx={{
            "& .MuiDialog-paper": {
              animation: "fadeIn 0.5s ease-out",
            },
          }}
        >
          <DialogTitle>Know about how to use CollabBros</DialogTitle>
          <DialogContent>
            {/* Map through helpTopics */}
            <Stack
              spacing={2}
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {helpTopics.map((topic, index) => (
                <Stack key={index} sx={{ width: "100%", flexDirection: "row" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "top",
                    }}
                  >
                    <topic.icon
                      sx={{ color: topic.iconColor, marginRight: "8px" }}
                    />
                    <Stack>
                      <strong>{topic.title}:</strong> {topic.description}
                    </Stack>
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
};


export default Navbar;

// List of CodeMirror shortcuts with icons
const shortcuts = [
  {
    key: "Ctrl + Arrow Left/Right",
    description: "Move the cursor one word left or right.",
    icon: ArrowForward,
    iconColor: "#1976d2", // Blue
  },
  {
    key: "Ctrl + Arrow Up/Down",
    description: "Scroll the editor up or down one line.",
    icon: Keyboard,
    iconColor: "#4caf50", // Green
  },
  {
    key: "Home",
    description: "Move to the beginning of the current line.",
    icon: Home,
    iconColor: "#ff5722", // Orange
  },
  {
    key: "End",
    description: "Move to the end of the current line.",
    icon: KeyboardArrowDown,
    iconColor: "#9c27b0", // Purple
  },
  {
    key: "Page Up/Page Down",
    description: "Scroll the editor up or down by one page.",
    icon: Pageview,
    iconColor: "#8bc34a", // Light Green
  },
  {
    key: "Ctrl + Z",
    description: "Undo the last action.",
    icon: Undo,
    iconColor: "#e91e63", // Pink
  },
  {
    key: "Ctrl + Shift + Z (or Ctrl + Y)",
    description: "Redo the last undone action.",
    icon: Redo,
    iconColor: "#ff9800", // Amber
  },
  {
    key: "Ctrl + X",
    description: "Cut the selected text.",
    icon: FileCopy,
    iconColor: "#2196f3", // Blue
  },
  {
    key: "Ctrl + C",
    description: "Copy the selected text.",
    icon: FileCopy,
    iconColor: "#2196f3", // Blue
  },
  {
    key: "Ctrl + V",
    description: "Paste the copied/cut text.",
    icon: FileCopy,
    iconColor: "#2196f3", // Blue
  },
  {
    key: "Ctrl + A",
    description: "Select all text in the editor.",
    icon: SelectAll,
    iconColor: "#4caf50", // Green
  },
  {
    key: "Ctrl + D",
    description: "Duplicate the current line or selected text.",
    icon: Code,
    iconColor: "#ff5722", // Orange
  },
  {
    key: "Ctrl + Shift + K",
    description: "Delete the current line.",
    icon: Keyboard,
    iconColor: "#9c27b0", // Purple
  },
  {
    key: "Ctrl + F",
    description: "Open the find dialog to search for text.",
    icon: Search,
    iconColor: "#3f51b5", // Blue
  },
  {
    key: "Ctrl + G",
    description: "Find the next occurrence of the search term.",
    icon: Search,
    iconColor: "#3f51b5", // Blue
  },
  {
    key: "Ctrl + H",
    description: "Open the replace dialog.",
    icon: Search,
    iconColor: "#3f51b5", // Blue
  },
  {
    key: "Ctrl + Shift + [",
    description: "Fold the current block of code.",
    icon: Code,
    iconColor: "#ff5722", // Orange
  },
  {
    key: "Ctrl + Shift + ]",
    description: "Unfold the current block of code.",
    icon: Code,
    iconColor: "#ff5722", // Orange
  },
  {
    key: "Ctrl + /",
    description: "Toggle comments on the selected lines.",
    icon: Comment,
    iconColor: "#607d8b", // Blue-grey
  },
  {
    key: "Ctrl + Shift + M",
    description: "Select matching bracket or parenthesis.",
    icon: Keyboard,
    iconColor: "#9c27b0", // Purple
  },
  {
    key: "Ctrl + Space",
    description: "Trigger autocomplete suggestions.",
    icon: Keyboard,
    iconColor: "#4caf50", // Green
  },
];

// Data structure for help topics with icons and colors
const helpTopics = [
  {
    title: "Real-Time Collaboration",
    description:
      "Allow multiple users to edit the same document simultaneously, with live updates and changes reflected in real-time.",
    icon: GroupWorkIcon,
    iconColor: "#1976d2", // Blue
  },
  {
    title: "Version Control",
    description:
      "Implement a version history so users can track changes, revert to previous versions, or compare different versions of a document.",
    icon: HistoryIcon,
    iconColor: "#4caf50", // Green
  },

  {
    title: "Text Formatting & Rich Text Features",
    description:
      "Add tools for bold, italics, underline, and strikethrough text, along with support for inserting links, images, and videos.",
    icon: FormatBoldIcon,
    iconColor: "#ff9800", // Amber
  },

  {
    title: "Markdown Preview",
    description:
      "Provide a live markdown preview panel so users can see how their text will look when formatted in markdown.",
    icon: VisibilityIcon,
    iconColor: "#8bc34a", // Light Green
  },

  {
    title: "Customizable Keyboard Shortcuts",
    description:
      "Allow users to define their own keyboard shortcuts for commonly used actions (e.g., bold, italic, undo, etc.).",
    icon: KeyboardIcon,
    iconColor: "#2196f3", // Blue
  },
  {
    title: "Comments and Annotations",
    description:
      "Enable users to add comments and annotations on specific sections of the text, helpful for collaborative projects or feedback.",
    icon: CommentIcon,
    iconColor: "#e91e63", // Pink
  },
  // {
  //   title: "Code Snippets and Auto-Completion",
  //   description:
  //     "Implement a feature for saving frequently used code snippets and provide auto-completion to speed up coding.",
  //   icon: CodeIcon,
  //   iconColor: "#ff5722", // Orange
  // },
  // {
  //   title: "Speech-to-Text",
  //   description:
  //     "Add voice recognition capabilities for users to dictate their text instead of typing, improving accessibility.",
  //   icon: MicIcon,
  //   iconColor: "#607d8b", // Blue-grey
  // },
  // {
  //   title: "Export Options",
  //   description:
  //     "Allow users to export documents in various formats, such as PDF, DOCX, Markdown, or plain text.",
  //   icon: SaveAltIcon,
  //   iconColor: "#3f51b5", // Blue
  // },
  // {
  //   title: "Cloud Integration",
  //   description:
  //     "Integrate cloud storage options (Google Drive, Dropbox, etc.) to save and retrieve documents directly from the cloud.",
  //   icon: CloudUploadIcon,
  //   iconColor: "#00bcd4", // Cyan
  // },
  // {
  //   title: "Syntax Highlighting",
  //   description:
  //     "Add syntax highlighting for various programming languages (JavaScript, Python, HTML, etc.), making it more useful for developers.",
  //   icon: CodeIcon,
  //   iconColor: "#ff5722", // Orange
  // },
  // {
  //   title: "Dark Mode / Light Mode",
  //   description:
  //     "Provide a toggle between dark and light themes for a more user-friendly interface, accommodating different lighting environments.",
  //   icon: NightsStayIcon,
  //   iconColor: "#9c27b0", // Purple
  // },
  // {
  //   title: "Multilingual Support",
  //   description:
  //     "Add translation features or integrate multi-language support so users can type and work in different languages.",
  //   icon: TranslateIcon,
  //   iconColor: "#4caf50", // Green
  // },
  // {
  //   title: "Text Analytics & Insights",
  //   description:
  //     "Provide text analytics tools that analyze the document for readability, word count, sentence structure, grammar, and style suggestions.",
  //   icon: BarChartIcon,
  //   iconColor: "#9c27b0", // Purple
  // },
];

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Support",
    path: "/Support",
  },
];
