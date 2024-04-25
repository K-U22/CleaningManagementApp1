import "./SignInPopupContents.css"
import { db } from '../firebase'
import CleaningStateButton from "./CleaningStateButton"
import SmellStateButton from "./SmellStateButton"
import TextArea from "./TextArea"
import SignInRoomStateButton from "./SignInRoomStateButton"
import OpenCloseButton from "./OpenCloseButton"



/*サインイン中の管理者画面です。 */

const SignInPopupContents = ({
    buttonState, 
    smellState,
    closeModal, 
    handleButtonClick,
    handleSmellButtonClick,
    changeStateButtons,
    roomNumber,
    undoButtonState,
    applyToDb,
    signInbuttonState, 
    signInsetButton, 
    setKeepSignInButton,
    message,
    setMessage,
    onChangeMessage}) => {


const signInStateName = ["ベイカント","滞在中" , "退出済み", "故障"]
const signInchangeStateButtons = Array.from({length:4},(_,index) => signInStateName[index])
        
const SignInHandleButtonClick = (index,roomNumber) => {

      const StringRoomNumber = "room" + roomNumber;

      db.collection("rooms").doc(StringRoomNumber).onSnapshot((snapshot) => {
        const signInbuttonState = snapshot.data().signInbuttonState;
        setKeepSignInButton(signInbuttonState);
      });

            const signInNewButtonStates = Array(signInbuttonState.length).fill(false);
            signInNewButtonStates[index] = !signInNewButtonStates[index];
            signInsetButton(signInNewButtonStates);

      }


  return (
  <div className="overlay" onClick={() => {closeModal(); undoButtonState()}}>
    <div className="contentSignIn" onClick={(e) => e.stopPropagation()} >

    <div>{roomNumber}</div>
   
   {/* 清掃完了などの４つのボタン */} 
   <div className='signInContentContainer'>

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

  {/* 管理者用の４つのボタン */}
      
      <SignInRoomStateButton signInchangeStateButtons={signInchangeStateButtons}
                             SignInHandleButtonClick={SignInHandleButtonClick}
                             roomNumber={roomNumber}
                             signInbuttonState={signInbuttonState} />




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

export default SignInPopupContents