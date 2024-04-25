import React from 'react'

const SignInRoomStateButton = ({signInchangeStateButtons,
                                SignInHandleButtonClick,
                                roomNumber,
                                signInbuttonState
                               }) => {
  return (
    <div className='signInbuttonContainer'>
    {signInchangeStateButtons.map((signInbuttonState2,index) =>
        <button key={index} onClick={() => {SignInHandleButtonClick(index,roomNumber);}} className={signInbuttonState[index] ? 'signInActiveChangeState' : 'signInChangeState'}>
          {signInbuttonState2}
    
        </button>
      )}

     
    </div>
  )
}

export default SignInRoomStateButton