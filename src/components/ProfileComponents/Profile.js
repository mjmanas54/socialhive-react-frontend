import React from 'react'
import ProfileBox from './ProfileBox'
import PostBox from './PostBox'
import { useParams, Routes,Route } from 'react-router-dom'
import Followers from './Followers'
import Following from './Following'

const Profile = (props) => {
  const {user_id} = useParams();
  return (
    <div className="profile-page mt-3">
      <ProfileBox user_id={user_id} loggedInUser={props.loggedInUser}/>
      <Routes>
        <Route path={"posts"} element={<PostBox user_id={user_id} loggedInUser={props.loggedInUser}/>}/>
        <Route path={"followers"} element={<Followers user_id={user_id}/>}/>
        <Route path={"following"} element={<Following user_id={user_id}/>}/>
      </Routes>
    </div>
  )
}

export default Profile
