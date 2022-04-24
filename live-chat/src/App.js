import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth.js/Auth';
import Chat from './pages/Chat/Chat';
import io from "socket.io-client";
const socket = io.connect('http://localhost:8080/');
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Auth socket={socket} />} />
          <Route path='/chat' element={<Chat socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
