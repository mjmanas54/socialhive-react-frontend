import React, { useEffect, useState } from 'react'
import FollowRequest from './FollowRequest'

const FollowRequestsBox = (props) => {
  const [filteredRequests,setFilteredRequests] = useState(null);
  useEffect(()=>{
    setFilteredRequests(props.user.requestsReceived);
  },[props.user.requestsReceived])
  if(filteredRequests === null){
    return(
      <p>loading..</p>
    )
  }
  return (
    <div className='mx-3' style={{"width":"30%"}}>
      <div className="d-flex flex-column bg-white px-3 rounded-3" style={{"minHeight":"50vh"}}>
        <div className="d-flex justify-content-center py-3 border-bottom border-secondary">
          <b>Follow Requests</b>
        </div>
        {filteredRequests.length?
        
          filteredRequests.map((request,index)=>(
            <FollowRequest key={index} request={request} filteredRequests={filteredRequests} setFilteredRequests={setFilteredRequests} setFollowersChange={props.setFollowersChange}/>
          ))
          :
          (
            <div className="d-flex justify-content-center align-items-center" style={{"margin-top":"40%"}}>
              No follow requests
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FollowRequestsBox
