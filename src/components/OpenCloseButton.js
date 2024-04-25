import React from 'react'

const OpenCloseButton = ({closeModal,
                         undoButtonState,
                         applyToDb,
                         roomNumber}) => {
  return (
    <div>
        <button className='signInCloseButton' onClick={() => {closeModal(); undoButtonState()}}>
    閉じる
  </button>
  <button className='signInApplyButton'  onClick={() => {closeModal(); applyToDb(roomNumber)}}>
     適用
  </button>
  </div>
  )
}

export default OpenCloseButton