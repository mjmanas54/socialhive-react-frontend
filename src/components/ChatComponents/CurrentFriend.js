import React from 'react'
import {Link} from 'react-router-dom'

const CurrentFriend = (props) => {
  return (
    <div className="current-friend py-2">
      <div className="profile-pic-current">
        <img className="profile-pic-current-img" src={props.selectedUser.dp} alt="avatar"/>
      </div>
      <div className="name">
        <div className="name-text">
          <Link to={`http://localhost:3000/profile/${props.selectedUser._id}`} style={{"textDecoration":"none","color":"black"}}>
            <b>{props.selectedUser==null?"null":props.selectedUser.name}</b>
          </Link>
        </div>
        <div className="status">
          online
        </div>
      </div>
    </div>
  )
}

export default CurrentFriend
