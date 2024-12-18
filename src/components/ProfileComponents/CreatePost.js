import React, { useRef, useState } from 'react'

const CreatePost = (props) => {
    const fileRef = useRef(null);
    const [selectedFiles,setSelectedFiles] = useState([])
    const [previews,setPreviews] = useState([])
    const [numBtn,setNumBtn] = useState(1)
    const [editOpen,setEditOpen] = useState(true)
    const [text,setText] = useState("")

    const handleClickOnUploadImg = ()=>{
        fileRef.current.click();
    }

    const handleOnTextChange = (e)=>{
        setText(e.target.value)
        e.target.style.height = "auto"; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleOnChangeFile = (e)=>{
        const file = e.target.files[0]
        const files = Array.from(e.target.files); // Convert FileList to array
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

        // Generate previews for newly selected files
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

        setNumBtn(numBtn+1)
    }

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("uploader",props.loggedInUser["_id"])
        formData.append("text",text)
        selectedFiles.forEach((file)=>{
            formData.append("files",file)
        })

        // Log FormData contents
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try{
            const res = await fetch("http://localhost:9000/create_post",{
                method:"POST",
                body: formData,
                credentials:'include',
            });
            const result = await res.json()
            console.log(result)
        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className='d-flex flex-column bg-white my-4' style={{"marginLeft":"350px","marginRight":"350px"}}>
        {/* <button className="btn btn-danger btn-circle">
            X
        </button> */}
        <form onSubmit={handleOnSubmit}>
            <div className="d-flex align-items-center my-3 mx-2">
                <div className="mx-3 w-100">
                    <textarea value={text} onChange={handleOnTextChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div className="post-images mx-4 my-3">
                <div id={`carouselExampleIndicators`} className="carousel slide">
                <div className="carousel-indicators">
                {Array.from({ length: numBtn }).map((_, index) => (
                    <button
                    type="button"
                    data-bs-target={`#carouselExampleIndicators`}
                    data-bs-slide-to={index}
                    className="active"
                    aria-current="true"
                    aria-label={`Slide ${index+1}`}
                    />
                ))}
                </div>
                <div className="carousel-inner">
                    {/* <div className="carousel-item active">
                    <img src="https://i.ibb.co/8DdJcmt/DALL-E-2024-12-15-19-56-21-A-clean-professional-background-image-for-an-email-template-featuring-sof.webp" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src="https://i.ibb.co/8DdJcmt/DALL-E-2024-12-15-19-56-21-A-clean-professional-background-image-for-an-email-template-featuring-sof.webp" className="d-block w-100" alt="..." />
                    </div> */}
                    {
                        previews.map((preview)=>(
                            <div className="carousel-item active" style={{"minHeight":"522px"}}>
                                <img src={preview} className="d-block w-100" alt="..."  />
                            </div>
                        ))
                    }
                    <div className="carousel-item active">
                    <img onClick={handleClickOnUploadImg} src={`${process.env.PUBLIC_URL}clickme.webp`} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators`}
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
            <input type='file' ref={fileRef} onChange={handleOnChangeFile} style={{"display":"none"}}/>
            <div className="d-flex flex-column align-items-center">
                <button type='submit' className="btn btn-primary mx-2 my-2">
                    Create Post
                </button>
            </div>
        </form>
    </div>
    )
}

export default CreatePost
