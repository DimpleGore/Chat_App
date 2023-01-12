import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatProvider from './Context/ChatProvider';
import { BrowserRouter } from 'react-router-dom';
import SnackbarContainer from './Context/snackbarProvider';
import SnackBars from './Components/Miscellaneous/SnackBar';
//import SnackbarContainer from './Context/snackbarProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SnackbarContainer>
      <SnackBars/>
      <ChatProvider>
           <App />
    </ChatProvider>
    </SnackbarContainer>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
