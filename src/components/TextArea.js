import React from 'react'

const TextArea = ({message,
                   setMessage,
                   onChangeMessage,
                   roomNumber
                   }) => {
  return (
    <form>
       <textarea placeholder={"特記事項" + "   " + message} className='special' rows="12" cols="90"
                 onChange={(e) => {setMessage(e.target.value); onChangeMessage(roomNumber)}}>
      </textarea>
    </form>
  )
}

export default TextArea;