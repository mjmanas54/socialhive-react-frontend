import React from 'react'
import { Link } from 'react-router-dom'

const ProfileNav = (props) => {
  const url = "http://localhost:3000"+props.base;
  return (
    <div className='profile-nav my-3'>
      <div className="card-footer mt-3 pt-2 pb-0">
        <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
          <li className="nav-item profile-nav-item"> <Link to={`${url}posts`} className="nav-link active profile-nav-item" > Posts </Link> </li>
          <li className="nav-item"> <Link to={`${url}followers`} className="nav-link" > Followers <span className="badge bg-success bg-opacity-10 text-success small"> {props.user.followers.length}</span> </Link> </li>
          <li className="nav-item"> <Link to={`${url}following`} className="nav-link" > Following <span className="badge bg-success bg-opacity-10 text-success small"> {props.user.following.length}</span> </Link> </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileNav
