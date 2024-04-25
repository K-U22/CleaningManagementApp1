import React from 'react'
import firebase from "firebase/compat/app";
import { auth } from '../firebase.js';


const SignIn = () => {

   const signInWithGoogle = () =>{
   const provider = new firebase.auth.GoogleAuthProvider();
   auth.signInWithPopup(provider);

   }


  return (
    <div>
        <button onClick={signInWithGoogle}>ログイン</button>
    </div>
  )
}

export default SignIn