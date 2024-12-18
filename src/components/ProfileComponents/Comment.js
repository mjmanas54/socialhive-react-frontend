import React, { useEffect, useState } from 'react'

const Comment = (props) => {
    const [userName,setUserName] = useState("");

    useEffect(()=>{
        const getUserName = async ()=>{
            try {
                const res = await fetch(`http://localhost:9000/user/${props.comment.commenter_id}`,{
                    method:"GET",
                    credentials:"include",
                });
                if (!res.ok) {
                    console.log(res)
                    throw new Error("Failed to decrement count");
                }
                const result = await res.json();
                setUserName(result.data.name)
            } catch (err) {
                console.log(err)
            }
        };
        getUserName();
    },[props.comment.commenter_id])

    const convertToIST = (timestamp) => {
        const now = Date.now();
        const differenceInMilliseconds = now - new Date(timestamp).getTime();
    
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
    
        if (differenceInSeconds < 60) {
            return `${differenceInSeconds} s`;
        } else if (differenceInMinutes < 60) {
            return `${differenceInMinutes} m`;
        } else if (differenceInHours < 24) {
            return `${differenceInHours} h`;
        }
    
        // If more than 24 hours, format as date and time
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "Asia/Kolkata",
        }).format(new Date(timestamp));
    };
    

    return (
        <div className='d-flex my-4'>
            <div className="user-display-pic d-flex align-items-center mx-2 my-1">
                <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" width={50}/>
            </div>
            <div className='d-flex flex-column rounded-2' style={{"backgroundColor":"#e9e8eb"}}>
                <div className='d-flex'>
                    <div className="d-flex align-items-center mx-2">
                        <b>{userName}</b>
                    </div>
                    <div className="d-flex align-items-center mx-2 text-secondary">
                        {convertToIST(props.comment.commented_at)}
                    </div>
                </div>
                <div className='d-flex align-items-center mx-2 text-secondary'>
                    {props.comment.comment_text}
                </div>
            </div>
        </div>
    )
}

export default Comment
