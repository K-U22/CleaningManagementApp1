import React from 'react'
import "./smell.css"

const Smell = ({index,
                smellStateDisplay,}) => {
 
  if(smellStateDisplay[index]){
    return (
    <div className='yesSmell'>＊臭い有り</div>
  )} else {
    return(
    <div className='noSmell'>---</div>
    )
  }

}

export default Smell