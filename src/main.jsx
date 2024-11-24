import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import theme from './pages/Editor/theme.js';
import './main.css'; // Ensure the file exists

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
                <App />
        </ChakraProvider>
    </React.StrictMode>
);
