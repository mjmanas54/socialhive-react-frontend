import React, { useState } from 'react'
import '../../App.css';
import Friendsbox from './Friendsbox';
import Messagebox from './Messagebox';

const Chatbox = (props) => {
  const [selectedUser,setSelectedUser] = useState(null);
  const [filteredUsers,setFilteredUsers] = useState([]);
  const [isActive,setIsActive] = useState(-1);

  if(props.loggedInUser === null){
    return(
      <></>
    )
  }

  return (
    <div className="container outer-box mt-2 bg-white">
      <Friendsbox setSelectedUser = {setSelectedUser} selectedUser={selectedUser} loggedInUser={props.loggedInUser} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers} isActive={isActive} setIsActive={setIsActive}/>
      <Messagebox setSelectedUser = {setSelectedUser} selectedUser={selectedUser} loggedInUser={props.loggedInUser} socket={props.socket} filteredUsers={filteredUsers} setFilteredUsers={setFilteredUsers} isActive={isActive} setIsActive={setIsActive}/>
    </div>
  )
}

export default Chatbox
