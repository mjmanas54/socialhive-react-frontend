import React,{useState,useEffect} from 'react'
import UserInfo from './UserInfo'
import FeedBox from './FeedBox'
import FollowRequestsBox from './FollowRequestsBox'

const Home = (props) => {
    const [user,setUser] = useState(null);
    const [followersChange,setFollowersChange] = useState(null);
    useEffect(() => {
        const getUser = async ()=>{
            try {
                const res = await fetch(`http://localhost:9000/user/${props.loggedInUser._id}`,{
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
        if(props.loggedInUser){
            getUser();
        }
    }, [props.loggedInUser]);
    if(props.loggedInUser === null || user === null){
        return(
            <p>loading...</p>
        )
    }
    return (
        <div className='d-flex justify-content-around m-4'>
            <UserInfo user={user} followersChange={followersChange}/>
            <FeedBox user={user}/>
            <FollowRequestsBox user={user} setFollowersChange={setFollowersChange}/>
        </div>
    )
}

export default Home
