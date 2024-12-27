import React from "react";
import styles from "./GenerateButton.module.css";
import { Stack } from "@mui/material";

// StarIcon component
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    viewBox="0 0 784.11 815.53"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={styles.fil0} // Apply the class for color
  >
    <defs></defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer"></metadata>
      <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
    </g>
  </svg>
);

const GenerateButton = ({ onClick, btnName }) => {
  const stars = [1, 2, 3, 4, 5, 6]; // Array for the number of stars to be rendered

  return (
    <button onClick={onClick} className={styles.button}>
      {btnName}
      {stars.map((star, index) => (
        <Stack key={index} className={`${styles.star} ${styles[`star-${star}`]}`}>
          <StarIcon />
        </Stack>
      ))}
    </button>
  );
};

export default GenerateButton;
