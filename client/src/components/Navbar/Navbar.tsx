import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "/src/assets/logo.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { rootColors } from "../../Utilities/rootColors";
import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
  Grid,
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
import ShortcutIcon from "@mui/icons-material/Shortcut";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import HistoryIcon from "@mui/icons-material/History";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CommentIcon from "@mui/icons-material/Comment";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false); // State for help dialog
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false); // State for shortcuts dialog
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const location = useLocation();

  // Open Shortcuts Dialog
  const handleOpenShortcuts = (scrollType: DialogProps["scroll"]) => () => {
    setShortcutsDialogOpen(true);
    setScroll(scrollType);
  };

  // Open Help Dialog
  const handleOpenHelp = () => {
    setHelpDialogOpen(true);
  };

  // Close Shortcuts Dialog
  const handleShortcutsClose = () => {
    setShortcutsDialogOpen(false);
  };

  // Close Help Dialog
  const handleHelpClose = () => {
    setHelpDialogOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (shortcutsDialogOpen || helpDialogOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [shortcutsDialogOpen, helpDialogOpen]);

  // Toggle Drawer (Mobile Menu)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks?.map((item, index) => (
          <Link
            to={item?.path}
            key={index}
            style={{ textDecoration: "none", color: rootColors?.primary }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color:
                      location?.pathname === item?.path
                        ? rootColors?.secondary
                        : rootColors?.primary,
                  }}
                >
                  {item?.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Stack
        sx={{
          display: { xs: "flex", md: "none" },
          gap: "5px",
          marginLeft: "0.7rem",
          alignItems: "flex-start",
        }}
      >
        <Button onClick={handleOpenShortcuts("paper")}>
          <ShortcutIcon />
          Shortcuts
        </Button>
        <Button onClick={handleOpenHelp}>
          <QuestionMarkIcon />
          Help
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Stack
      component={"nav"}
      sx={{
        boxSizing: "border-box",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        top: 0,
        position: "sticky",
        zIndex: 1000,
        backgroundColor: "white",
        color: rootColors?.primary,
        fontSize: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Stack sx={{ width: "5rem" }}>
        <img src={logo} alt="logo" />
      </Stack>

      {/* Nav Links for Desktop */}
      <Stack
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          gap: "20px",
        }}
      >
        {navLinks?.map((item, index) => (
          <Typography
            component={Link}
            key={index}
            to={item?.path}
            sx={{
              textDecoration: "none",
              color:
                location.pathname === item?.path
                  ? rootColors?.secondary
                  : rootColors?.primary,
              "&:hover": {
                color: rootColors?.secondary,
              },
              fontWeight: 700,
            }}
          >
            {item?.title}
          </Typography>
        ))}
      </Stack>

      {/* Modal Buttons for Shortcuts and Help */}
      <Stack
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Button onClick={handleOpenShortcuts("paper")}>
          <ShortcutIcon />
          Shortcuts
        </Button>
        <Button onClick={handleOpenHelp}>
          <QuestionMarkIcon />
          Help
        </Button>
      </Stack>

      {/* Shortcuts Dialog */}
      <Dialog
        open={shortcutsDialogOpen}
        onClose={handleShortcutsClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Shortcuts</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShortcutsClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Help Dialog */}
      <Dialog
        open={helpDialogOpen}
        onClose={handleHelpClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Help</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {/* Replace DialogContentText with div */}
          <div
            id="scroll-dialog-description"
            ref={descriptionElementRef as React.LegacyRef<HTMLDivElement>}
            tabIndex={-1}
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHelpClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Hamburger Menu for Mobile */}
      <Stack
        sx={{ display: { xs: "flex", md: "none" } }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon sx={{ fontSize: "40px", cursor: "pointer" }} />
      </Stack>

      {/* Drawer for Mobile */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
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
