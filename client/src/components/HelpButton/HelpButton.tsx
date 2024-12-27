import React from "react";
import "./HelpButton.module.css";
import { Button, Stack } from "@mui/material";

const HelpButton = ({ icons, btnName, onClick }) => {
  return (
    <Stack className="main_div">
      <Button
        className="help-button"
        onClick={onClick}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {icons}
        {btnName}
        <span></span>
      </Button>
    </Stack>
  );
};

export default HelpButton;
