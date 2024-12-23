import React from 'react'

const DisplayPicture = (props) => {
  return (
    <div className=' mx-3' style={{"width":"33%"}}>
      <img src={props.user.dp} alt="avatar" width="100%" style={{"borderRadius":"100%"}}/>
    </div>
  )
}

export default DisplayPicture
