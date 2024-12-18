import React, { useEffect, useState } from 'react'
import CoverPhoto from './CoverPhoto'
import ProfileContent from './ProfileContent'
import ProfileNav from './ProfileNav'

const ProfileBox = (props) => {
  const [user,setUser] = useState(null);
  const getUserName = async ()=>{
    try {
      const res = await fetch(`http://localhost:9000/user/${props.user_id}`,{
          method:"GET",
          credentials:"include",
      });
      if (!res.ok) {
          console.log(res)
          throw new Error("Failed to decrement count");
      }
      const result = await res.json();
      setUser(result.data)
      // console.log("result.data",result.data)
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    getUserName();
  }, [props.user_id]);

  if(!user){
    return(<p>Loading...</p>)
  }
  return (
    <div className='profile-box my-2 bg-white'>
      <CoverPhoto user={user}/>
      <ProfileContent user={user}/>
      <ProfileNav user={user}/>
    </div>
  )
}

export default ProfileBox
