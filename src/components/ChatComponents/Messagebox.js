import React from 'react'
import CurrentFriend from './CurrentFriend'
import ChatSection from './ChatSection'


const Messagebox = (props) => {
  return (
    <div className="container message-box ps-2">
      {
        props.selectedUser?
        (
          <CurrentFriend setSelectedUser={props.setSelectedUser} selectedUser={props.selectedUser} isActive={props.isActive} setIsActive={props.setIsActive}/>
        ):
        ""
      }
      <ChatSection selectedUser={props.selectedUser} setSelectedUser={props.setSelectedUser} loggedInUser={props.loggedInUser} socket={props.socket} setIsActive={props.setIsActive} filteredUsers={props.filteredUsers} setFilteredUsers={props.setFilteredUsers}/>
    </div>
  )
}

export default Messagebox
