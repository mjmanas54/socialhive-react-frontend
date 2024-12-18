import React, { useRef } from 'react'

const ProfileContent = (props) => {
  const divRef = useRef(null);
  const calcDPPosition = () => {
    if (divRef.current) {
      const divRect = divRef.current.getBoundingClientRect();
      return {
        top: `${divRect.top-167}px`,
        left: `${divRect.left}px`,
      };
    }
    return {};
  };

  const convertToIST = (timestamp) => {
    const now = Date.now();
    const differenceInMilliseconds = now - new Date(timestamp).getTime();

    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} s`;
    } else if (differenceInMinutes < 60) {
        return `${differenceInMinutes} m`;
    } else if (differenceInHours < 24) {
        return `${differenceInHours} h`;
    }

    // If more than 24 hours, format as date and time
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }).format(new Date(timestamp));
  };

  return (
    <div className='profile-content'>
      <div className="profile-name">
        <div className="display-picture mx-2">
          <img className="rounded-circle display-picture-img" width="13%" src={props.user.dp} alt="avatar"/>
        </div>
        <div className="profile-name-text mx-2 mt-3">
          <b>{props.user.name}</b>
        </div>
      </div>
      <div ref={divRef} className="profile-info d-flex">
      <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">  
        <li className="list-inline-item mx-2"><i className="fa fa-map-marker"></i> New Hampshire</li>
        <li className="list-inline-item mx-2"><i className="fa fa-calendar"></i> Joined {convertToIST(props.user.createdAt)}</li>
      </ul>
      </div>
    </div>
  )
}

export default ProfileContent
