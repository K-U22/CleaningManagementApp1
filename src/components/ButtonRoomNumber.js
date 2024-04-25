import React, { useEffect, useState } from 'react';
import "./ButtonRoomNumber.css";
import Popup from './Popup';
import { db } from '../firebase';
import RoomState from './RoomState';
import Smell from './Smell';
import CleaningState from './CleaningState';



const ButtonRoomNumber = ({user}) => {
  
 
  const [roomState, setRoom] = useState([]);
  const [cleaningState, setCleaning] = useState("未清掃");
  const [message, setMessage] = useState("");
  const [buttonState, setButton] = useState([false,false,false,false]);
  const [smellState, setSmell] = useState([false,true]);
  const [smellStateDisplay, setSmellDisplay] = useState([false,true]);
  const [roomNumber, setRoomNumber] = useState();
  const [signInbuttonState, signInsetButton] = useState([true,false,false,false]);
  const [show, setShow] = useState(false);
  
  const promises = [];
  const promises2 = [];
  const promises3 = [];
  const roomStateName = ["ベイカント", "滞在中","退出済み","故障"];
  const cleaningStateName = ["清掃完了", "清掃開始","チェック済み","未清掃"];

  const startNumber = 201;
  const endNumber = 230;
  const buttons = Array.from({ length: endNumber - startNumber + 1 }, (_, index) => startNumber + index);

const createRoomNumber = (index) =>{
   const roomNumber = 200 + index;
   setRoomNumber(roomNumber);
}



/* マウント時にデータベースから情報を取り出し、ボタン上に反映させる */
useEffect(()=>{
   toReflect();
},[])

const toReflect = () => {

  /* データベースから全部の部屋の情報を取り出し、promises配列にpush、
  　　その後useStateに格納し、ボタンに読み込ませ部屋の状態を表示させる*/
  for (let i = 1; i <= 30; i++) {
    const roomNumber = 200 + i;
    const roomNumberString = "room" + roomNumber;

    const roomRef = db.collection("rooms").doc(roomNumberString);
    const promise = roomRef.get().then((doc) => {
        if (doc.exists) {
            return doc.data().roomState;
        } else {
            return null;
        }
    });
    promises.push(promise);
}

for (let i = 1; i <= 30; i++) {
  const roomNumber = 200 + i;
  const roomNumberString = "room" + roomNumber;

  const roomRef = db.collection("rooms").doc(roomNumberString);
  const promise = roomRef.get().then((doc) => {
      if (doc.exists) {
          return doc.data().cleaningState;
      } else {
          return null;
      }
  });
  promises2.push(promise);
}

for (let i = 1; i <= 30; i++) {
const roomNumber = 200 + i;
const roomNumberString = "room" + roomNumber;

const roomRef = db.collection("rooms").doc(roomNumberString);
const promise = roomRef.get().then((doc) => {
    if (doc.exists) {
        return doc.data().smellState[0];
    } else {
        return null;
    }
});
promises3.push(promise);
}


Promise.all(promises).then((roomStates) => {
  setRoom(roomStates);
});

Promise.all(promises2).then((cleaningState) => {
    setCleaning(cleaningState);
});

Promise.all(promises3).then((smellState) => {
  setSmellDisplay(smellState);
});





}





 /* それぞれの部屋ボタンを押すたびにDBから4つのデータを取得 */
const handleDbget = (index) =>{


  const roomNumber = 200 + (index + 1);
  const roomNumberString = "room" + roomNumber;

   /* room205などのドキュメントがなかった場合新しく作成、
   　　あった場合、取得 */
  const roomRef = db.collection("rooms").doc(roomNumberString);
  roomRef.get().then((doc) => {
    if(doc.exists){
          
  db.collection("rooms").doc(roomNumberString).onSnapshot((snapshot) => {
    const buttonState = snapshot.data().buttonState;
    setButton(buttonState);

    
  });
  

  db.collection("rooms").doc(roomNumberString).onSnapshot((snapshot) => {
    const smellState = snapshot.data().smellState;
    setSmell(smellState);

    
  });

  db.collection("rooms").doc(roomNumberString).onSnapshot((snapshot) => {
    const signInbuttonState = snapshot.data().signInbuttonState;
    signInsetButton(signInbuttonState);

    
  });

  db.collection("rooms").doc(roomNumberString).onSnapshot((snapshot) => {
    const message = snapshot.data().message;
    setMessage(message);

    
  });

 
  
    } else {
      
      const newData = {
        // 新しいドキュメントのデータ
        smellState: [false, true],
        buttonState: [false,false,false,false],
        signInbuttonState: [true,false,false,false],
        Number: roomNumber,
        message:"",
        roomState:"ベイカント",
        cleaningState:"未清掃"
 
      };

      roomRef.set(newData);


    }
  })
}
  




  return (
    <div className="buttonContainer">
      {buttons.map((buttonNumber,index) => (

        <button key={index + 1} className={roomState[index] === "滞在中" ? 'StayRectangularButton' : 
                                           roomState[index] === "退出済み" ? "OutRectangularButton" : 
                                           roomState[index] === "故障" ? "OutOfOrderRectangularButton" : "rectangularButton"} 

         onClick={() => {setShow(true); handleDbget(index); createRoomNumber(index+1)}}>

          <div className="r201">
            {buttonNumber}
          </div>

          <hr className="line"/>

          <div className='roomState'>
            <RoomState roomState={roomState} index={index}/>
          </div>
          
          <div >
            <Smell smellStateDisplay={smellStateDisplay}
                   setSmellDisplay={setSmellDisplay} 
                   index={index}/>
          </div>
          
          <hr/>
          
          <div className='cleaningState'>
            {<CleaningState cleaningState={cleaningState} index={index}/>}
          </div>

        </button>
      ))}

     <Popup 
      show={show}
      setShow={setShow}
      user={user}
      buttonState={buttonState}
      setButton={setButton}
      smellState={smellState} 
      setSmell={setSmell} 
      roomNumber={roomNumber}
      setRoomNumber={setRoomNumber} 
      signInbuttonState={signInbuttonState} 
      signInsetButton = {signInsetButton}
      message={message}
      setMessage={setMessage}
      roomStateName={roomStateName}
      setRoom={setRoom}
      roomState={roomState}
      cleaningState={cleaningState}
      setCleaning={setCleaning}
      cleaningStateName={cleaningStateName}
      smellStateDisplay={smellStateDisplay}
      setSmellDisplay={setSmellDisplay}
      toReflect={toReflect}/>

    </div>
  )};


export default ButtonRoomNumber;