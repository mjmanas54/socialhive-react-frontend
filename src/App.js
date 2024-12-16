import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Chatbox from './components/Chatbox';
import { useState,useEffect } from 'react';

function App() {
  const [loggedInUser,setLoggedInUser] = useState(null)
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser)); // Parse the JSON string to an object
    }
  }, []);
  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <Routes>
        <Route exact path="/" element={<Chatbox loggedInUser={loggedInUser}/>}/>
        <Route exact path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
