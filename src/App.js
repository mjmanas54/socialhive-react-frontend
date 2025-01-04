import './App.css';
import Navbar from './components/Navbar';
import Login from './components/AuthComponents/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/AuthComponents/Signup';
import Chatbox from './components/ChatComponents/Chatbox';
import { useState,useEffect } from 'react';
import Profile from './components/ProfileComponents/Profile';
import CreatePost from './components/ProfileComponents/CreatePost';
import Home from './components/HomeComponents/Home';

function App() {
  const [loggedInUser,setLoggedInUser] = useState(null);
  const [socket,setSocket] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');

    
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser)); // Parse the JSON string to an object
    }

  }, []);

  const connectWebSocket = () => {
    if (socket) {
      console.log('WebSocket is already connected.');
      return; // Prevent creating a new socket if one is already established
    }

    const sckt = new WebSocket('ws://localhost:9000/ws'); // Replace with your WebSocket server URL

    sckt.onopen = () => {
      
    };

    // sckt.onmessage = (event) => {
    //   const parsedData = JSON.parse(event.data);
    //   const { action, message_content } = parsedData;

      
    //   if(action === "online"){
    //     console.log(message_content);
    //   }
    //   else{
    //     setMessages((prevMessages) => {
    //       const updatedMessages =
    //         action === "delete"
    //           ? (prevMessages || []).filter((message) => message._id !== message_content._id)
    //           : [...(prevMessages || []), message_content];
  
    //       return updatedMessages;
    //     });
    //     console.log(message_content);
    //   }
    // };

    // sckt.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };

    sckt.onclose = (event) => {
      console.log('WebSocket is closed:', event);
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        connectWebSocket(); // Reconnect on close
      }, 3000); // Retry after 3 seconds
    };

    setSocket(sckt);
  };

  useEffect(() => {
    if(loggedInUser){
      connectWebSocket();
    }

    return () => {
      if (socket) {
        console.log('Closing WebSocket connection...');
        socket.close();
      }
    };
  }, [loggedInUser]); // Empty dependency array ensures this runs once on mount

  if(loggedInUser && socket === null){
    return (
      <p>loading..</p>
    )
  }

  return (
    <Router>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} socket={socket}/>
      <Routes>
        <Route exact path="/" element={<Home loggedInUser={loggedInUser}/>}/>
        <Route exact path="/chat" element={<Chatbox loggedInUser={loggedInUser} socket={socket}/>}/>
        <Route exact path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route path="/profile/:user_id/*" element={<Profile loggedInUser={loggedInUser}/>}/>
        <Route path="/add-post" element={<CreatePost loggedInUser={loggedInUser}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
