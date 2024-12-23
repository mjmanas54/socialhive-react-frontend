import React, { useEffect, useState } from 'react'

const Followers = (props) => {
  const [followers,setFollowers] = useState(null);
  useEffect(()=>{
    const getAllFollowers = async ()=>{
      const res = await fetch(`http://localhost:9000/followers/${props.user_id}`,{
        method:"GET",
        credentials:"include",
      });
      const result = await res.json();
      setFollowers(result);
    }
    getAllFollowers();
  },[props.user_id]);
  if(followers === null){
    return (
      <p>Loading..</p>
    )
  }
  return (
    <div className='bg-white my-3 py-2'>
      <ul>
        {followers.map((follower)=>(
          <li>{follower.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Followers
