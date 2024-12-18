import React, { useEffect, useState } from 'react'
import Post from './Post'

const PostBox = (props) => {
  const [posts, setPosts] = useState([]); // State to store the posts
  // const [loading, setLoading] = useState(true); // State to show loading
  // const [error, setError] = useState(null); // State to handle errors
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:9000/posts/${props.user_id}`,{
          method:"GET",
          credentials:"include",
        });
        if (!res.ok) {
          console.log(res)
          throw new Error("Failed to fetch posts");
        }
        const result = await res.json();
        setPosts(result.posts); // Store posts in state
        // setLoading(false); // Set loading to false
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
        console.log(err)
      }
    };

    fetchPosts();
  }, [props.user_id]);
  return (
    <div className="post-box bg-white my-3">
      {
        posts?
        posts.map((post,index)=>(
          <Post key={index} id={index} post={post} loggedInUser={props.loggedInUser}/>
        ))
        :
        ""
      }
    </div>
  )
}

export default PostBox
