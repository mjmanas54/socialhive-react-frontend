import React, { useState, useEffect, useRef } from "react";
import ContextMenu from "./ContextMenu";

const Chat = (props) => {
  const [messageMine, setMessageMine] = useState(false);
  const [floatStyle, setFloatStyle] = useState({ marginRight: "auto" });
  const senderEmail = props.message.sender.email;
  const loggedInEmail = props.loggedInUser.email;
  const [contextMenu, setContextMenu] = useState(null); // Track position and target
  const [contextOptions, setContextOptions] = useState([]);
  const [chatSelected, setChatSelected] = useState(false);
  const contextMenuRef = useRef(null); // Ref for the ContextMenu
  const chatBoxRef = useRef(null); // Ref for the chat message

  // Determine if the message is from the logged-in user
  useEffect(() => {
    setMessageMine(senderEmail === loggedInEmail);
    setContextOptions(
      senderEmail === loggedInEmail
        ? [
            { label: "Delete Message", action: "delete" },
            { label: "Reply", action: "reply" },
          ]
        : [{ label: "Reply", action: "reply" }]
    );
  }, [senderEmail, loggedInEmail]);

  // Update chat styling on selection
  useEffect(() => {
    const updatedStyle = chatSelected
      ? messageMine
        ? { marginLeft: "auto", backgroundColor: "rgb(194 209 212)" }
        : { marginRight: "auto", backgroundColor: "rgb(191 189 189)" }
      : messageMine
      ? { marginLeft: "auto", backgroundColor: "#e8f1f3" }
      : { marginRight: "auto", backgroundColor: "#efefef" };
    setFloatStyle(updatedStyle);
  }, [chatSelected, messageMine]);

  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(date);
  };

  // Open the context menu
  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
    setChatSelected(true);
  };

  // Close the context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both chat box and context menu
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        
        setContextMenu(null);
        setChatSelected(false);
      }
    };

    const chatSection = props.chatSectionRef.current

    document.addEventListener("mousedown", handleClickOutside);
    chatSection.addEventListener("scroll", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      chatSection.removeEventListener("scroll", handleClickOutside);
    };
  }, [contextMenuRef, props.chatSectionRef]);

  const onOptionClick = (option) => {
    console.log("Option selected:", option.action);
    if (option.action === "delete") {
      console.log("Delete action triggered");
      // const deleteMessage = async (messageId) => {
      //   try {
      //     const url = `http://localhost:9000/delete_message/${messageId}`; // Construct the URL with the message ID
      
      //     const response = await fetch(url, {
      //       method: "DELETE", // Specify the HTTP method
      //       credentials: "include", // Ensure cookies are included in the request
      //     });
      
      //     if (!response.ok) {
      //       throw new Error(`HTTP error! status: ${response.status}`);
      //     }
      
      //     const result = await response.json(); // Assuming the response is JSON
      //     console.log("Message deleted successfully:", result);
      //     console.log(props.message);
      //     props.setMessages(props.messages.filter(msg=>msg!==props.message))
      //   } catch (error) {
      //     console.error("Error deleting message:", error);
      //   }
      // };
      // console.log(props.message._id)
      // deleteMessage(props.message._id);
      props.deleteMessage(props.message._id)
      setContextMenu(null);
      setChatSelected(false);
    }
  };

  return (
    <div className="container chat my-1">
      <div
        className="chat-content p-2"
        style={floatStyle}
        onContextMenu={handleRightClick}
        ref={chatBoxRef}
      >
        <div className="sender-name">
          <b>{messageMine ? "You" : props.message.sender.name}</b>
        </div>
        <div className="chat-text">{props.message.content}</div>
        <div className="time">{convertToIST(props.message.timestamp)}</div>
      </div>
      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          options={contextOptions}
          onOptionClick={onOptionClick}
          ref={contextMenuRef}
        />
      )}
    </div>
  );
};

export default Chat;
