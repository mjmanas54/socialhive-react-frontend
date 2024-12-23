import React, { useEffect, useState } from 'react'
import ProfileContent from './ProfileContent'
import DisplayPicture from './DisplayPicture'


const ProfileBox = (props) => {
  const [user,setUser] = useState(null);
  
  const getUser = async ()=>{
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
    getUser();
  }, [props.user_id]);

  if(!user){
    return(<p>Loading...</p>)
  }
  return (
    <div className='profile-box my-2 pt-4 bg-white'>
      <DisplayPicture user={user}/>
      <ProfileContent user={user} loggedInUser={props.loggedInUser}/>
    </div>
  )
}

export default ProfileBox
