import React,{useEffect,useState,useRef} from 'react'
import Chat from './Chat'
import EmptyChat from './EmptyChat';
import MessageTyper from './MessageTyper'
import { useNavigate } from 'react-router-dom';
import LoadingChat from './LoadingChat';

const ChatSection = (props) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:9000/messages/${props.loggedInUser.email}/${props.selectedUser.email}`, {
          method: 'GET',
          credentials: "include",
        });

        if (response.status === 401) {
          // Handle unauthorized response
          // console.log('Unauthorized! Redirecting to login...');
          // Redirect the user to the login page
          navigate("/login")
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const result = await response.json();
        setMessages(result); // Store the messages in the state
      } catch (error) {
        console.log(error.message)
      } finally{
        setIsLoading(false)
      }
    }

    if(props.selectedUser){
      fetchMessages();
    }


  },[props.selectedUser,props.loggedInUser.email])


  const connectWebSocket = () => {
    if (socket) {
      console.log('WebSocket is already connected.');
      return; // Prevent creating a new socket if one is already established
    }

    const sckt = new WebSocket('ws://localhost:9000/ws'); // Replace with your WebSocket server URL

    sckt.onopen = () => {
      
    };

    sckt.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      const { action, message_content } = parsedData;

      setMessages((prevMessages) => {
        const updatedMessages =
          action === "delete"
            ? (prevMessages || []).filter((message) => message._id !== message_content._id)
            : [...(prevMessages || []), message_content];

        return updatedMessages;
      });
    };

    sckt.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

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
    connectWebSocket();

    return () => {
      if (socket) {
        console.log('Closing WebSocket connection...');
        socket.close();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount


  const chatSectionRef = useRef(null);  // Reference to the chat section

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
    }
  }, [messages]);  // Trigger effect when messages change


  const sendMessage = (to,messageContent) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        "action":"send",
        "to":to,
        "msg":messageContent
      };
      socket.send(JSON.stringify(message));
    }
  };

  const deleteMessage = (messageId) => {
    // while sending delete request make sure to send messageId in msg instead of  messageContent
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        "action":"delete",
        "to":props.selectedUser.email,
        "msg":messageId
      };
      socket.send(JSON.stringify(message));
    }
  }

  return (
    <>
    <div className="container chat-section hidden-scrollbar" ref={chatSectionRef}>
      {!isLoading?
      (messages?messages.map((message,index)=>(
        <Chat key={index} setMessages={setMessages} messages={messages} message={message} chatSectionRef={chatSectionRef} loggedInUser={props.loggedInUser} deleteMessage={deleteMessage}/>
      )):<EmptyChat/>)
      :
      <LoadingChat/>
      }
      
    </div>
    <MessageTyper selectedUser={props.selectedUser} sendMessage={sendMessage}/>
    </>
  )
}

export default ChatSection
