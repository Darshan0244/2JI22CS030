import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import UrlShortener from './pages/UrlShortener';
import Statistics from './pages/Statistics';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export const UrlContext = createContext();

function App() {
  const [urls, setUrls] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UrlContext.Provider value={{ urls, setUrls }}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Router>
      </UrlContext.Provider>
    </ThemeProvider>
  );
}

export default App;