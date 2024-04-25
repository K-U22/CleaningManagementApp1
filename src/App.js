
import './App.css';
import ButtonRoomNumber from './components/ButtonRoomNumber';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut.js';
import { auth } from './firebase.js';
import {useAuthState} from "react-firebase-hooks/auth";

function App() {

   const [user] = useAuthState(auth);

  return (
    <div >
      {user ? <SignOut/> : <SignIn/>}
      <ButtonRoomNumber user ={user}/>
    </div>
  );
}

export default App;
