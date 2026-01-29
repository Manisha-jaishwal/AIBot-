import { Outlet } from 'react-router-dom'
import { ThemeContext } from './theme/ThemeContext';
import { useState, useEffect } from 'react';
import Sidebar from './Component/Sidebar/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './theme/ThemePallete';
import { Box } from '@mui/material'

function App() {

  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')
  const [chat, setChat] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>

          <Box
            sx={{
              width: { xs: "70%", md: "260px" },
              bgcolor: "primary.light",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              position: { xs: "fixed", md: "relative" },
              height: "100vh",
              zIndex: 1300,
              transform: { xs: menuOpen ? "translateX(0)" : "translateX(-100%)", md: "none" },
              transition: "transform 0.3s ease",
            }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Box>

          <Box
            sx={{
              flex: 1,
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <Outlet context={{ chat, setChat, handleMobileMenu: setMenuOpen }} />
          </Box>

        </Box>

      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
