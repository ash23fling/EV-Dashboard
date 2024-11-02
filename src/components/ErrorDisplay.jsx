import React from "react";
import { Typography } from "@mui/material";

const ErrorDisplay = ({ error }) => {
  return (
    <Typography variant="h6" color="error">
      {error}
    </Typography>
  );
};

export default ErrorDisplay;
