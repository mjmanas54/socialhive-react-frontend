import React from 'react'
import {Link} from 'react-router-dom'

const CurrentFriend = (props) => {
  const convertToIST = (timestamp) => {

    // if (differenceInSeconds < 60) {
    //     return `${differenceInSeconds} s`;
    // } else if (differenceInMinutes < 60) {
    //     return `${differenceInMinutes} m`;
    // } else if (differenceInHours < 24) {
    //     return `${differenceInHours} h`;
    // }

    // If more than 24 hours, format as date and time
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(new Date(timestamp));
  };
  return (
    <div className="current-friend py-2">
      <div className="profile-pic-current">
        <img className="profile-pic-current-img" src={props.selectedUser.dp} alt="avatar"/>
      </div>
      <div className="name">
        <div className="name-text">
          <Link to={`http://localhost:3000/profile/${props.selectedUser._id}/`} style={{"textDecoration":"none","color":"black"}}>
            <b>{props.selectedUser==null?"null":props.selectedUser.name}</b>
          </Link>
        </div>
        <div className="status">
          {
            
            props.isActive===-1?
            props.selectedUser.isActive?
            "online":
            `last seen ${convertToIST(props.selectedUser.lastActive)}`
            :
            props.isActive===1?
            "online":
            `last seeen ${convertToIST(Date.now())}`
          }
        </div>
      </div>
    </div>
  )
}

export default CurrentFriend
