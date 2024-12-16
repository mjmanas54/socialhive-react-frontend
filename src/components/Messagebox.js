import React from 'react'
import CurrentFriend from './CurrentFriend'
import ChatSection from './ChatSection'


const Messagebox = (props) => {
  
  return (
    <div className="container message-box ps-2">
      <CurrentFriend setSelectedUser={props.setSelectedUser} selectedUser={props.selectedUser}/>
      <ChatSection selectedUser={props.selectedUser} loggedInUser={props.loggedInUser}/>
    </div>
  )
}

export default Messagebox
