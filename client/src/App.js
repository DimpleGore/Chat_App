import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import "./App.css"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
         <Route exact path="/" element={<Homepage/>} />
         </Routes>
      </BrowserRouter>
      </div>
    
  );
}

export default App;
