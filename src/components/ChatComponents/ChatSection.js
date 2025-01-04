import React,{useEffect,useState,useRef} from 'react'
import Chat from './Chat'
import EmptyChat from './EmptyChat';
import MessageTyper from './MessageTyper'
import { useNavigate } from 'react-router-dom';
import LoadingChat from './LoadingChat';
import NoChatOpen from './NoChatOpen';

const ChatSection = (props) => {
  const [messages, setMessages] = useState([]);
  // const [socket, setSocket] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const navigate = useNavigate();
  // const location = useLocation();

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


  props.socket.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    const { action, message_content } = parsedData;

    
    if(action === "online"){
      console.log("online",message_content);
      if(props.selectedUser.email === message_content){
        // props.setSelectedUser({...props.selectedUser,isActive:true})
        props.setIsActive(1);
      }
      const updatedUsers = props.filteredUsers.map((user) =>
        user.email === message_content ? { ...user, isActive: true } : user
      );
      props.setFilteredUsers(updatedUsers);
    }
    else if(action === "offline"){
      console.log("offline",message_content);
      if(props.selectedUser.email === message_content){
        // props.setSelectedUser({...props.selectedUser,isActive:false,lastActive:Date.now()})
        props.setIsActive(0);
      }
      const updatedUsers = props.filteredUsers.map((user) =>
        user.email === message_content ? { ...user, isActive: false, lastActive: Date.now() } : user
      );
      props.setFilteredUsers(updatedUsers);
    }
    else{
      setMessages((prevMessages) => {
        const updatedMessages =
          action === "delete"
            ? (prevMessages || []).filter((message) => message._id !== message_content._id)
            : [...(prevMessages || []), message_content];

        return updatedMessages;
      });
      console.log(message_content);
    }
  };

  props.socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };


  const chatSectionRef = useRef(null);  // Reference to the chat section

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
    }
  }, [messages]);  // Trigger effect when messages change


  const sendMessage = (to,messageContent) => {
    if (props.socket && props.socket.readyState === WebSocket.OPEN) {
      const message = {
        "action":"send",
        "to":to,
        "msg":messageContent
      };
      props.socket.send(JSON.stringify(message));
    }
  };

  const deleteMessage = (messageId) => {
    // while sending delete request make sure to send messageId in msg instead of  messageContent
    if (props.socket && props.socket.readyState === WebSocket.OPEN) {
      const message = {
        "action":"delete",
        "to":props.selectedUser.email,
        "msg":messageId
      };
      props.socket.send(JSON.stringify(message));
    }
  }

  if(props.selectedUser === null){
    return (
      <NoChatOpen/>
    )
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
