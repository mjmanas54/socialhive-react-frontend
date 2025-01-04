import React from 'react'

const FriendInfo = (props) => {
  const handleOnClick = ()=>{
    props.setSelectedUser(props.user);
    props.setIsActive(-1);
  }
  return (
    <div className={`container friend-info p-3 ${((props.selectedUser !== null)&&(props.selectedUser.email === props.user.email))?("selected"):""}`} onClick={handleOnClick}>
      <div className="profile-pic">
        <img className="profile-pic-img" src={props.user.dp} alt="avatar"/>
      </div>
      <div className="name">
        <div className="name-text">
          {props.user.name}
        </div>
      </div>
      <div className="message-count">
        1
      </div>
    </div>
  )
}

export default FriendInfo
