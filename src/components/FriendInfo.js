import React from 'react'

const FriendInfo = (props) => {
  const handleOnClick = ()=>{
    props.setSelectedUser({"name":props.user.name,
      "email":props.user.email
    })

  }
  return (
    <div className={`container friend-info p-3 ${((props.selectedUser !== null)&&(props.selectedUser.email === props.user.email))?("selected"):""}`} onClick={handleOnClick}>
      <div className="profile-pic">
        <img className="profile-pic-img" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
      </div>
      <div className="name">
        <div className="name-text">
          {props.user.name}
        </div>
        <div className="status">
          online
        </div>
      </div>
      <div className="message-count">
        1
      </div>
    </div>
  )
}

export default FriendInfo