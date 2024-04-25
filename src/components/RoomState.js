import React from 'react'
import "./RoomState.css"


const RoomState = ({roomState,index}) => {

  if(roomState[index] === "ベイカント"){  
  return (
    <div className='vacant'>{roomState[index]}</div>
  )};

  if(roomState[index] === "滞在中"){  
    return (
    <div className='staying'>{roomState[index]}</div>
  )};
  
  if(roomState[index] === "退出済み"){  
    return (
    <div className='out'>{roomState[index]}</div>
  )};

  if(roomState[index] === "故障"){  
    return (
    <div className='outOfOrder'>{roomState[index]}</div>
  )};
  
}

export default RoomState