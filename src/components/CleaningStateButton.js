import React from 'react'

const CleaningStateButton = ({changeStateButtons,
                              handleButtonClick,
                              roomNumber,
                              buttonState}) => {
  return (
    <div className='buttonContainer'>
      {changeStateButtons.map((buttonState2,index) =>
          <button key={index} onClick={() => handleButtonClick(index, roomNumber)} className={buttonState[index] ? 'activeChangeState' : 'changeState'}>
            {buttonState2}
      
          </button>
        )}
       
      </div>
  )
}

export default CleaningStateButton