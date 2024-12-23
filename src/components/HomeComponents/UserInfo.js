import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserInfo = (props) => {
  const [numPosts,setNumPosts] = useState(0);
  useEffect(()=>{
    const getNumberOfPosts = async ()=>{
      try{
        const res = await fetch(`http://localhost:9000/posts/${props.user._id}`,{
          method:"GET",
          credentials:"include",
        })
        const result = await res.json();
        if(!res.ok){
          console.log(result);
        }
        else{
          setNumPosts(result.posts.length);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    getNumberOfPosts();
  },[props.user._id])
  return (
    <div className='mx-3' style={{"width":"25%"}}>
      <div className="d-flex flex-column bg-white rounded-3">
        <div className="d-flex justify-content-center my-3">
          <img src={props.user.dp} alt="" width={"50%"} style={{"borderRadius":"100%","border":"solid 3px var(--bs-secondary)"}}/>
        </div>
        <div className="d-flex justify-content-center">
          <Link to={`/profile/${props.user._id}`} className='user-info-name'><b>{props.user.name}</b></Link>
        </div>
        <div className="d-flex justify-content-center m-3 text-secondary">
          I'd love to change the world, but they won’t give me the source code.
        </div>
        <div className="d-flex m-3">
          <div className="d-flex flex-column align-items-center px-1" style={{"width":"30%"}}>
            <div>
              <b>{numPosts}</b>
            </div>
            <div className='text-secondary'>
              Posts
            </div>
          </div>
          <div className="d-flex flex-column align-items-center px-3" style={{"width":"40%"}}>
            <div>
              <b>{props.user.followers.length+props.followersChange}</b>
            </div>
            <div className='text-secondary'>
              Followers
            </div>
          </div>
          <div className="d-flex flex-column align-items-center px-1" style={{"width":"30%"}}>
            <div>
              <b>{props.user.following.length}</b>
            </div>
            <div className='text-secondary'>
              Following
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
