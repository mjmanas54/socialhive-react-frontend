import React from 'react'

const CurrentFriend = (props) => {
  return (
    <div className="current-friend py-2">
      <div className="profile-pic-current">
        <img className="profile-pic-current-img" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar"/>
      </div>
      <div className="name">
        <div className="name-text">
          {props.selectedUser==null?"null":props.selectedUser.name}
        </div>
        <div className="status">
          online
        </div>
      </div>
    </div>
  )
}

export default CurrentFriend
