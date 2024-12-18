import React, { useState } from 'react'
import '../../App.css';
import Friendsbox from './Friendsbox';
import Messagebox from './Messagebox';
import NoChatOpen from './NoChatOpen';

const Chatbox = (props) => {
  const [selectedUser,setSelectedUser] = useState(null)

  return (
    <div className="container outer-box mt-2 bg-white">
      <Friendsbox setSelectedUser = {setSelectedUser} selectedUser={selectedUser} loggedInUser={props.loggedInUser}/>
      {selectedUser?
        <Messagebox setSelectedUser = {setSelectedUser} selectedUser={selectedUser} loggedInUser={props.loggedInUser}/>
        :
        <NoChatOpen/>
      }
    </div>
  )
}

export default Chatbox
