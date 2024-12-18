import React from 'react'
import ProfileBox from './ProfileBox'
import PostBox from './PostBox'
import { useParams } from 'react-router-dom'

const Profile = (props) => {
  const {user_id} = useParams();
  return (
    <div className="profile-page">
      <ProfileBox user_id={user_id}/>
      <PostBox user_id={user_id} loggedInUser={props.loggedInUser}/>
    </div>
  )
}

export default Profile
