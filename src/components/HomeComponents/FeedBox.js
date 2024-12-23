import React, { useEffect, useState } from 'react'
import Post from '../ProfileComponents/Post'

const FeedBox = (props) => {
    const [feeds,setFeeds] = useState([]);
    useEffect(()=>{
        const getFeeds = async ()=>{
            try{
                const res = await fetch(`http://localhost:9000/feeds/${props.user._id}`,{
                    method:"GET",
                    credentials:"include",
                })
                const result = await res.json();
                if(!res.ok){
                    console.log("Error",result);
                }
                else{
                    setFeeds(result.posts);
                }
            }catch(err){
                console.log(err)
            }
        }
        getFeeds();
    },[props.user])
    if(feeds === null){
        return(
            <p>loading...</p>
        )
    }
    return (
        <div className='mx-3 flex-2 bg-white rounded-3' style={{"maxWidth":"45%"}}>
            {
                feeds?
                (
                    feeds.map((post,index)=>(
                        <Post key={index} id={index} post={post} loggedInUser={props.user}/>
                    ))
                ):
                ""
            }
        </div>
    )
}

export default FeedBox
