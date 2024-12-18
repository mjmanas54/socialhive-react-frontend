import React, { useRef } from 'react'

const ProfileNav = () => {
  const btnRef = useRef(null);
  const handleOnChangeDp = ()=>{
    btnRef.current.click();
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log("hello this is submit")
  }
  return (
    <div className='profile-nav'>
      <div className="card-footer mt-3 pt-2 pb-0">
        <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
          <li className="nav-item"> <p className="nav-link active" > Posts </p> </li>
          <li className="nav-item"> <p className="nav-link" > About </p> </li>
          <li className="nav-item"> <p className="nav-link" > Connections <span className="badge bg-success bg-opacity-10 text-success small"> 230</span> </p> </li>
          <li className="nav-item"> <p className="nav-link" > Media</p> </li>
          <li className="nav-item"> <p className="nav-link" > Videos</p> </li>
          <li className="nav-item"> <p className="nav-link" > Events</p> </li>
          <li className="nav-item"> <p className="nav-link" > Activity</p> </li>
          <li className="nav-item" onClick={handleOnChangeDp}> <p className="nav-link" > Change DP</p> </li>
        </ul>
      </div>
      <form style={{"display":"none"}} onSubmit={handleSubmit}>
        <button ref={btnRef} type='submit' ></button>
      </form>
    </div>
  )
}

export default ProfileNav
