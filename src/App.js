import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseBackground from './pages/ChooseBackground/ChooseBackground';
import TypeOfCar from './pages/TypeOfCar/TypeOfCar';
import QR from './pages/QR/QR';
import Layout from './components/Layout';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B0000', // Dark red
    },
    secondary: {
      main: '#FF6347', // Light red
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ChooseBackground />} />
          <Route path="/type-of-car" element={<TypeOfCar />} />
          <Route path="/qr" element={<QR />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;