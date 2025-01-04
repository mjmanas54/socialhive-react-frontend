import React,{useRef,useEffect,useState} from 'react'
import Comment from './Comment'

const Post = (props) => {
    const carouselInnerRef = useRef(null); // Reference to the outer div
    const [maxImageHeight, setMaxImageHeight] = useState(0); // State to store the max height
    const [isLiked,setIsLiked] = useState(0);
    const [userName,setUserName] = useState("");
    const [commentText,setCommentText] = useState("");
    const [filteredComments,setFilteredComments] = useState(props.post.comments);
    const [dp,setDp] = useState("");

    const handleOnChangeComment = (e)=>{
        setCommentText(e.target.value)
    }

    const handleOnSubmitComment = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("text",commentText);
        formData.append("user_id",props.loggedInUser._id)
        formData.append("post_id",props.post._id)
        try{
            const res = await fetch("http://localhost:9000/add_comment",{
                method:"POST",
                body:formData,
                credentials:"include",
            })
            const result = await res.json();
            const comment = result.data
            setFilteredComments((prev) => [...(prev || []), comment]);
            setCommentText("")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{    
        if(props.post.likedBy.includes(props.loggedInUser._id)){
            setIsLiked(1);
        }
    },[props.loggedInUser])

    useEffect(() => {
        // Calculate the max height of all images once they are loaded
        const updateHeight = () => {
            const images = carouselInnerRef.current.querySelectorAll("img");
            let maxHeight = 0;

            images.forEach((img) => {
                if (img.complete) {
                    maxHeight = Math.max(maxHeight, img.offsetHeight);
                }
            });

            setMaxImageHeight(maxHeight);
        };

        // Update height when images are loaded
        const images = carouselInnerRef.current.querySelectorAll("img");
        images.forEach((img) => {
            if (!img.complete) {
                img.onload = updateHeight; // Trigger update when image loads
            }
        });

        // Initial update
        updateHeight();
    }, [props.post.images]); // Run whenever the images change

    const changeLikeCount = async ()=>{
        if(isLiked===1 || isLiked===2){
            try {
                const res = await fetch(`http://localhost:9000/update_likes/decrement/${props.post._id}/${props.loggedInUser._id}`,{
                    method:"GET",
                    credentials:"include",
                });
                if (!res.ok) {
                    console.log(res)
                    throw new Error("Failed to decrement count");
                }
                const result = await res.json();
                setIsLiked((isLiked+2)%4)
            } catch (err) {
                console.log(err)
            }
        }
        else{
            try {
                const res = await fetch(`http://localhost:9000/update_likes/increment/${props.post._id}/${props.loggedInUser._id}`,{
                    method:"GET",
                    credentials:"include",
                });
                if (!res.ok) {
                    console.log(res)
                    throw new Error("Failed to increment count");
                }
                const result = await res.json();
                setIsLiked((isLiked+2)%4)
            } catch (err) {
                // setError(err.message);
                // setLoading(false);
                console.log(err)
            }
        }
    }

    useEffect(()=>{
        const getUserName = async ()=>{
            try {
                const res = await fetch(`http://localhost:9000/user/${props.post.uploader}`,{
                    method:"GET",
                    credentials:"include",
                });
                if (!res.ok) {
                    console.log(res)
                    throw new Error("Failed to decrement count");
                }
                const result = await res.json();
                setUserName(result.data.name)
                setDp(result.data.dp)
            } catch (err) {
                console.log(err)
            }
        };
        getUserName();
    },[props.post.uploader])

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
    <div className="post d-flex flex-column my-3">
        <div className="postsender-info d-flex mt-3 mb-1">
            <div className="postsender-profile-pic px-4 my-1">
                <img className="rounded-circle" src={dp} alt="" width={50}/>
            </div>
            <div className="postsender-name d-flex ">
                <div className="postsender-name-text d-flex align-items-center">
                    <b>{userName}</b>
                    <i
                    style={{
                        display: "inline-block",
                        width: 4,
                        height: 4,
                        backgroundColor: "grey",
                        borderRadius: "50%"
                    }}
                    className='mx-3'
                    />
                    <div style={{"color":"grey"}}>{convertToIST(props.post.createdAt)}</div>
                </div>
            </div>
        </div>
        <div className="d-flex" style={{"color":"grey"}}>
            <div className="post-text px-4 my-2">
                {props.post.text}
            </div>
        </div>
        <div className="post-images mx-4 my-3">
            <div id={`carouselExampleIndicators${props.id}`} className="carousel slide">
            <div className="carousel-indicators">
                {Array.from({ length: props.post.images.length }).map((_, index) => (
                    <button
                    type="button"
                    data-bs-target={`#carouselExampleIndicators${props.id}`}
                    data-bs-slide-to={index}
                    className="active"
                    aria-current="true"
                    aria-label={`Slide ${index+1}`}
                    />
                ))}
            </div>
            <div
                className="carousel-inner"
                ref={carouselInnerRef}
                style={{ minHeight: `${maxImageHeight}px` }} // Apply the calculated height
            >
                {props.post.images.map((img, index) => (
                    <div
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                    >
                        <img src={img} className="d-block w-100 rounded-1" alt="..." />
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselExampleIndicators${props.id}`}
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carouselExampleIndicators${props.id}`}
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </div>
        <div className="post-actions d-flex mb-2">
            <div className='like' onClick={changeLikeCount} style={{"textDecoration":"none"}}>
                <div className="like-button ms-4 d-flex align-items-center">
                    <i className="fa fa-thumbs-up" style={{"color":isLiked===1||isLiked===2?"var(--bs-dark)":"var(--bs-secondary)"}}></i>
                    <div className="like-count ms-1 me-3" style={{"color":isLiked===1||isLiked===2?"var(--bs-dark)":"var(--bs-secondary)"}}>
                        Like({
                            isLiked===2?(
                                props.post.likedBy.length+1
                            ):
                            isLiked===3?
                            props.post.likedBy.length-1
                            :
                            props.post.likedBy.length
                        })
                    </div>
                </div>
            </div>
            <div className="like-button ms-2 d-flex align-items-center">
                <div
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${props.id}`}
                        aria-expanded="true"
                        aria-controls={`collapse${props.id}`}
                    >
                    <i className="fa fa-comment" style={{"color":"var(--bs-secondary)"}}></i>
                    <div className="like-count ms-1 me-3" style={{"color":"var(--bs-secondary)"}}>
                        Comment
                    </div>
                </div>
            </div>
            <a href="#" style={{"textDecoration":"none"}}>
                <div className="like-button ms-2 d-flex align-items-center">
                    <i className="fa fa-share" style={{"color":"var(--bs-secondary)"}}></i>
                    <div className="like-count ms-1 me-3" style={{"color":"var(--bs-secondary)"}}>
                        Share
                    </div>
                </div>
            </a>
        </div>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <div
                id={`collapse${props.id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
                >
                <div className="accordion-body">
                    <div className="comment-section">
                        <form onSubmit={handleOnSubmitComment}>
                            <div className="comment-typer d-flex align-items-center">
                                <div className="user-display-pic d-flex align-items-center mx-2 my-1">
                                    <img className="rounded-circle" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" width={50}/>
                                </div>
                                <div className="input-group">
                                    <input required value={commentText} onChange={handleOnChangeComment} type="text" className="form-control" placeholder="Add a comment..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2"><i className='fa fa-send'></i></button>
                                </div>
                            </div>
                        </form>
                        <div className="commments">
                            {
                                filteredComments?
                                filteredComments.map((comment)=>(
                                    <Comment comment={comment}/>
                                ))
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </div>
    )
}

export default Post
