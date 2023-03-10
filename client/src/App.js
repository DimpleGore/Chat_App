import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import "./App.css"
import ChatPage from './Pages/ChatPage';
//import ChatProvider from './Context/ChatProvider';
//import { SnackbarContainer } from './Context/snackbarProvider';

function App() {
  return (
    <div className='App'>
      
      
          <Routes>
         <Route exact path="/" element={<Homepage/>} />
         <Route exact path='/chats' element={<ChatPage/>} />
         </Routes>
         
      
      </div>
    
  );
}

export default App;
