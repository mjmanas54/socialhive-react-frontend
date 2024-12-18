import React, { useState,useRef,useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react';

const MessageTyper = (props) => {
  const [msgText,setMsgText] = useState("")
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const pickerRef = useRef(null);
  const pickerButtonRef = useRef(null);
  const divRef = useRef(null);

  const handleOnChange = (event)=>{
    setMsgText(event.target.value)
  }

  const onSendMsg = (event)=>{
    event.preventDefault()
    props.sendMessage(props.selectedUser.email,msgText)
    setMsgText("")
  }

  const handleEmojiClick = (emojiData)=>{
    const emoji = emojiData.emoji;
    setMsgText(msgText+emoji)
  }

  const calculatePickerPosition = () => {
    if (divRef.current) {
      const divRect = divRef.current.getBoundingClientRect();
      return {
        top: `${divRect.top - 450}px`, // Adjust this value based on the EmojiPicker's height
        left: `${divRect.left}px`,
      };
    }
    return {};
  };

  // Close the emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((pickerButtonRef.current && !pickerButtonRef.current.contains(event.target))&&(pickerRef.current && !pickerRef.current.contains(event.target))) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={onSendMsg}>
      {showEmojiPicker && (
          <div style={{ position: "absolute", zIndex: 1000, ...calculatePickerPosition()}}>
            <div ref={pickerRef}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          </div>
        )}
      <div className="input-group container my-2 message-typer" ref={divRef}>
        <button className="btn btn-outline-secondary mt-2" type="button" id="button-addon1" ref={pickerButtonRef} onClick={()=>{setShowEmojiPicker(!showEmojiPicker)}}><span role="img" aria-label="emoji">😊</span></button>
        <input required onChange={handleOnChange} value={msgText} type="text" className="form-control mt-2" placeholder="Type your message here" aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button className="btn btn-outline-secondary mt-2" type="submit" id="button-addon2"><i className="fa fa-send"></i>
        </button>
      </div>
    </form>
  )
}

export default MessageTyper
