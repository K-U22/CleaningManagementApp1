import "./Popup.css"
import { useState } from 'react';
import SignOutPopupContents from './SignOutPopupContents.js';
import SignInPopupContents from './SignInPopupContents.js';
import { db } from '../firebase.js';

const Popup = ({show,
                setShow,
                user,
                buttonState,
                setButton,
                smellState,
                setSmell,
                roomNumber,
                signInsetButton, 
                signInbuttonState,
                message,
                setMessage,
                roomStateName,
                cleaningStateName,
                toReflect}) => {

  /* 清掃完了ボタンなどを押した際に適用を押すまでの間、状態を保持 */
const [keepButtonState, setKeepButton] = useState([]);
const [keepSmeellButtonState, setKeepSmellButton] = useState([]);
const [keepSignInButtonState, setKeepSignInButton] = useState([]);
const [keepMessage, setKeepMessage] = useState(""); 


const stateName = ["清掃完了","清掃開始" , "チェック済み", "未清掃"]
const changeStateButtons = Array.from({length:4},(_,index) => stateName[index])


/* ポップアップを消す処理*/
const closeModal = () => {
        setShow(false)
      }

 /*ボタンを切り替えたものの、適用以外のボタンを押してページを戻した際、
  　ボタンの状態を以前の状態に戻す処理 */
const undoButtonState = () =>{
      setSmell(keepSmeellButtonState);
      setButton(keepButtonState);
      signInsetButton(keepSignInButtonState);
      setMessage(keepMessage);
    }
    
     /* 適用を押すまでメッセージの前の状態を保持しつつ、保存 */
const onChangeMessage = (roomNumber) =>{
      const StringRoomNumber = "room" + roomNumber;

      db.collection("rooms").doc(StringRoomNumber).onSnapshot((snapshot) => {
        const message = snapshot.data().message;
        setKeepMessage(message);
        
      });
    }




    
const handleButtonClick = (index, roomNumber) => {
      /* 清掃完了ボタンなどを押した際に適用を押すまでの間、状態を保持 */
      const StringRoomNumber = "room" + roomNumber;

      db.collection("rooms").doc(StringRoomNumber).onSnapshot((snapshot) => {
        const buttonState = snapshot.data().buttonState;
        setKeepButton(buttonState);
      });

       const newButtonStates = Array(buttonState.length).fill(false);
       newButtonStates[index] = !newButtonStates[index];
       setButton(newButtonStates);
    }


     
const handleSmellButtonClick = (index) =>{
     /* 清掃完了ボタンなどを押した際に適用を押すまでの間、状態を保持 */
      const StringRoomNumber = "room" + roomNumber;

      db.collection("rooms").doc(StringRoomNumber).onSnapshot((snapshot) => {
        const smellState = snapshot.data().smellState;
        setKeepSmellButton(smellState);
      });


      const newSmellButtonStates = Array(smellState.length).fill(false);
      newSmellButtonStates[index] = !newSmellButtonStates[index];
      setSmell(newSmellButtonStates);
    }



    /* 適用ボタンを押した際、DBに部屋の状態を適用する処理 */
     const applyToDb = (roomNumber) => {
      
      const StringRoomNumber = "room" + roomNumber;
      const roomRef = db.collection("rooms").doc(StringRoomNumber);
     
      roomRef.update("buttonState", buttonState);
      roomRef.update("smellState", smellState );
      roomRef.update("signInbuttonState", signInbuttonState);
      roomRef.update("message", message);
    
       /* 適用ボタンを押した際、DBに部屋の状態の名前を適用する処理(滞在中など) */
      for(let i = 0; i <= 3; i++){
          if(signInbuttonState[i] === true){
             roomRef.update("roomState",roomStateName[i]);
             break;
          }
      }

      for(let i = 0; i <= 3; i++){
        if(buttonState[i] === true){
           roomRef.update("cleaningState",cleaningStateName[i]);
           break;
        }
    }
      

     /* データベースから全部の部屋の情報を取り出し、promises配列にpush、
  　　その後useStateに格納し、ボタンに読み込ませ部屋の状態を表示させる*/
     toReflect();
}


    
    
    
    
      if(show){

 /*本来trueだと<SignOut～/>だが、github pagesにてgoogleログイン機能が
      　使えないため<signIn～/>へと遷移*/

       if(user){
        return (
          <SignOutPopupContents 
           show={show}
           setShow={setShow} 
           user={user}
           buttonState={buttonState} 
           setButton={setButton} 
           smellState={smellState}
           setSmell={setSmell} 
           closeModal={closeModal} 
           handleButtonClick={handleButtonClick}
           handleSmellButtonClick={handleSmellButtonClick}
           changeStateButtons={changeStateButtons}
           roomNumber={roomNumber} 
           keepButtonState={keepButtonState}
           setKeepButton={setKeepButton} 
           undoButtonState={undoButtonState}
           applyToDb={applyToDb} 
           signInbuttonState={signInbuttonState} 
           signInsetButton = {signInsetButton}
           message={message}
           setMessage={setMessage}
           onChangeMessage={onChangeMessage}/>
        )
      }else{
        return (
          <SignInPopupContents 
           show={show} 
           setShow={setShow} 
           user={user}
           buttonState={buttonState} 
           setButton={setButton} 
           smellState={smellState}
           setSmell={setSmell} 
           closeModal={closeModal}
           handleButtonClick={handleButtonClick}
           handleSmellButtonClick={handleSmellButtonClick}
           changeStateButtons={changeStateButtons}
           roomNumber={roomNumber}
           keepButtonState={keepButtonState}
           setKeepButton={setKeepButton} 
           undoButtonState={undoButtonState}
           applyToDb={applyToDb} 
           signInbuttonState={signInbuttonState} 
           signInsetButton = {signInsetButton} 
           keepSignInButtonState={keepSignInButtonState}
           setKeepSignInButton={setKeepSignInButton}
           message={message}
           setMessage={setMessage}
           onChangeMessage={onChangeMessage}/>
        )
      }

      } else {
        return null;
      } 
    }

export default Popup