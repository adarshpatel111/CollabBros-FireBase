import React from "react";
import "./HelpButton.module.css";
import { Button, Stack } from "@mui/material";

const HelpButton = ({ icons, btnName, onClick }) => {
  return (
    <Stack
      className="main_div"
      sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Button
        className="help-button"
        onClick={onClick}
        sx={{ display: "flex" }}
      >
        {icons}
        {btnName}
        <span></span>
      </Button>
    </Stack>
  );
};

export default HelpButton;
