import React from 'react'
import "./CleaningState.css"

const CleaningState = ({cleaningState,index}) => {
  
    if(cleaningState[index] === "清掃完了"){  
        return (
          <div className='complete'>{cleaningState[index]}</div>
        )};
    
    if(cleaningState[index] === "清掃開始"){  
        return (
          <div className='start'>{cleaningState[index]}</div>
        )};

    if(cleaningState[index] === "チェック済み"){  
        return (
          <div className='checked'>{cleaningState[index]}</div>
        )};
  
    if(cleaningState[index] === "未清掃"){  
        return (
          <div className='notStart'>{cleaningState[index]}</div>
        )};
   
}

export default CleaningState