import React from 'react'
import CleaningStateButton from './CleaningStateButton';
import SmellStateButton from './SmellStateButton';
import TextArea from './TextArea';
import OpenCloseButton from './OpenCloseButton';


const SignOutPopupContents = ({
    buttonState, 
    smellState,
    closeModal, 
    handleButtonClick,
    handleSmellButtonClick,
    changeStateButtons,
    roomNumber,
    undoButtonState,
    applyToDb,
    message,
    setMessage,
    onChangeMessage}) => {
      

  return (
    <div className="overlay" onClick={() => {closeModal(); undoButtonState()}}>
            <div className="content" onClick={(e) => e.stopPropagation()} >
          
           <div>{roomNumber}</div>

      {/* 清掃完了などの４つのボタン */} 
           <div className='contentContainer'>

              <CleaningStateButton changeStateButtons={changeStateButtons}
                              handleButtonClick={handleButtonClick}
                              roomNumber={roomNumber}
                              buttonState={buttonState}/>


              <hr/>

       {/* 臭いありなしの２つのボタン */}
              <SmellStateButton handleSmellButtonClick={handleSmellButtonClick}
                        smellState={smellState}/>

       {/* 特記事項 */}    
              <TextArea message={message}
                setMessage={setMessage}
                onChangeMessage={onChangeMessage}
                roomNumber={roomNumber}/>

       {/* 閉じる、適用ボタン */}
              <OpenCloseButton closeModal={closeModal}
                         undoButtonState={undoButtonState}
                         applyToDb={applyToDb}
                         roomNumber={roomNumber}/>
              </div>

            </div>
          </div >
  )
}

export default SignOutPopupContents