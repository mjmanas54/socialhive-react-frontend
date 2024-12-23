import React, { useEffect, useState } from 'react'

const Following = (props) => {
  const [following,setFollowing] = useState(null);
  useEffect(()=>{
    const getAllFollowing = async ()=>{
      const res = await fetch(`http://localhost:9000/following/${props.user_id}`,{
        method:"GET",
        credentials:"include",
      });
      const result = await res.json();
      setFollowing(result);
    }
    getAllFollowing();
  },[props.user_id]);
  if(following === null){
    return (
      <p>Loading..</p>
    )
  }
  return (
    <div className='bg-white my-3 py-2'>
      <ul>
        {following.map((follower)=>(
          <li>{follower.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Following
