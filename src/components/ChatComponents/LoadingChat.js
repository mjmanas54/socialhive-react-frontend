import React from 'react'

const LoadingChat = () => {
  return (
    <div className='spinner-box'>
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        <div className="d-flex justify-content-center my-3">
            Chats are loading please wait....
        </div>
    </div>
  )
}

export default LoadingChat
