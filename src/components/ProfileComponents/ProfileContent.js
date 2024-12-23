import React, {useState,useEffect} from 'react'
import { useResolvedPath } from 'react-router-dom';
import ProfileNav from './ProfileNav'

const ProfileContent = (props) => {
  const [base,setBase] = useState("");
  const currPath = useResolvedPath("").pathname;
  const [requestId,setRequestId] = useState("");
  useEffect(()=>{
    setBase(currPath)
  },[]);

  const [followStatus,setFollowStatus] = useState(3);
  /*
    0 not followed not requested
    1 not followed requested
    2 followed
  */

  useEffect(()=>{
    const checkFollowStatus = async ()=>{
      const res = await fetch(`http://localhost:9000/user/${props.loggedInUser._id}`,{
        method:"GET",
        credentials:"include",
      });
      const result = await res.json();
      if(result.data.following.includes(props.user._id)){
        setFollowStatus(2);
        return;
      }
      let flag = true;
      result.data.requestsSent.forEach(element => {
        if(element.to === props.user._id){
          flag = false;
          setRequestId(element._id)
        }
      });

      if(flag){
        setFollowStatus(0);
      }
      else{
        setFollowStatus(1);
      }
      
    }
    checkFollowStatus();
  },[props.user,props.loggedInUser])

  const handleOnClick = async ()=>{
    
    if(followStatus === 0){
      const formData = new FormData();
      formData.append("sender",props.loggedInUser._id);
      formData.append("receiver",props.user._id);
      try{
        const res = await fetch("http://localhost:9000/follow-request",{
          method:"POST",
          body:formData,
          credentials:"include",
        });
        if(!res.ok){
          console.log("Error",res.status,res.statusText);
        }
        else{
          setFollowStatus(1);
          const result = await res.json();
          setRequestId(result.requestId);
        }
      }catch(error){
        console.log(error);
      }
    }
    else if(followStatus === 1){
      try{
        const res = await fetch(`http://localhost:9000/follow-request/sender/${requestId}`,{
          method:"DELETE",
          credentials:"include",
        });
        if(!res.ok){
          console.log("Error",res.status,res.statusText);
        }
        else{
          setFollowStatus(0);
        }
      }catch(error){
        console.log(error);
      }
    }else{
      try{
        const res = await fetch(`http://localhost:9000/unfollow/${props.user._id}`,{
          method:"DELETE",
          credentials:"include",
        });
        if(!res.ok){
          console.log("Error",res.status,res.statusText);
        }
        else{
          setFollowStatus(0);
        }
      }catch(error){
        console.log(error);
      }
    }
  }

  if(followStatus === 3){
    return(
      <p>loading...</p>
    )
  }

  return (
    <div className='profile-content d-flex flex-direction-column'>
      <div className="d-flex">
        <div className="profile-name-text d-flex align-items-center mx-2">
          <b>{props.user.name}</b>
        </div>
        <div className='follow-btn d-flex align-items-center'>
          {
            props.user._id !== props.loggedInUser._id
            ?
            (
              <button type='button' onClick={handleOnClick} className="btn btn-primary">{
                followStatus === 0?
                (
                  "Follow"
                ):
                followStatus === 1?
                (
                  "Requested"
                ):
                (
                  "Unfollow"
                )
              }</button>
            )
            
            :""
          }
        </div>
      </div>
      <div className="bio mt-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto pariatur excepturi repellendus? Quam culpa asperiores quod minima ex voluptate non dolore repellat consequuntur. Blanditiis dolores libero fuga laborum magni quibusdam.
      </div>
      <ProfileNav user={props.user} base={base}/>
    </div>
  )
}

export default ProfileContent
