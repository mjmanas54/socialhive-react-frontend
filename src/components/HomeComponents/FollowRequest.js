import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const FollowRequest = (props) => {
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const getUser = async ()=>{
            try {
                const res = await fetch(`http://localhost:9000/user/${props.request.from}`,{
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
        getUser();
    },[props.request])

    const handleAccept = async ()=>{
        try{
            const res = await fetch(`http://localhost:9000/follow-request/${props.request._id}/accept`,{
                method:"PUT",
                credentials:"include",
            });
            const result = await res.json();
            if(!res.ok){
                console.log(result);
            }
            else{
                props.setFilteredRequests(props.filteredRequests.filter((item) => item !== props.request));
                props.setFollowersChange((prev)=>prev+1);
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleReject = async ()=>{
        try{
            const res = await fetch(`http://localhost:9000/follow-request/receiver/${props.request._id}`,{
                method:"DELETE",
                credentials:"include",
            });
            const result = await res.json();
            if(!res.ok){
                console.log(result);
            }
            else{
                props.setFilteredRequests(props.filteredRequests.filter((item) => item !== props.request));
            }
        }catch(err){
            console.log(err);
        }
    }

    if(user === null){
        return(
            <p>Loading..</p>
        )
    }
    return (
        <div className='d-flex mx-1 my-3' style={{"width":"100%"}}>
            <div className='d-flex align-items-center' style={{"width":"20%"}}>
                <img src={user.dp} alt="" width={"100%"}/>
            </div>
            <div className="d-flex align-items-center" style={{"width":"40%"}}>
                <Link to={`/profile/${user._id}`} className='text-dark text-decoration-none'>{user.name}</Link>
            </div>
            <div className="d-flex align-items-center mx-2" style={{"width":"10%"}}>
                <button className="btn btn-outline-dark" onClick={handleAccept}>
                    <i className="fa fa-check"></i>
                </button>
            </div>
            <div className="d-flex align-items-center mx-2" style={{"width":"10%"}}>
                <button className="btn btn-outline-dark" onClick={handleReject}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
        </div>
    )
}

export default FollowRequest
