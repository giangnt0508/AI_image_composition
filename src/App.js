import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseBackground from './pages/ChooseBackground/ChooseBackground';
import TypeOfCar from './pages/TypeOfCar/TypeOfCar';
import MainPage from './pages/mainPage/mainPage';
import Layout from './components/Layout';
import LayoutMUX from './components/LayoutMUX';
import QR from './pages/QR/QR';
import './App.css';
import VNmap from './pages/VNmap/VNmap';
import ChoosePerson from './pages/ChoosePerson/ChoosePerson';
import CommentPerson from './pages/CommentPerson/CommentPerson';

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
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mux/*" element={
            <LayoutMUX>
              <Routes>
                <Route path="/" element={<VNmap />} />
                <Route path="/choose-person" element={<ChoosePerson/>} />
                <Route path="/comment-person" element={<CommentPerson/>} />
              </Routes>
            </LayoutMUX>
          } />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/choose-background" element={<ChooseBackground />} />
                <Route path="/type-of-car" element={<TypeOfCar />} />
                <Route path="/qr" element={<QR />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;