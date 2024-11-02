import React from "react";
import { CssBaseline, createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

const ThemeProvider = ({ darkMode, children }) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
