import React from 'react';
import { AppBar, Toolbar, Typography, FormControlLabel, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Typography variant="h6" component="div" className="toolbar-title">
          Electric Vehicle Dashboard
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
