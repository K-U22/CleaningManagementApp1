import React from 'react'
import {auth} from "../firebase.js";

const SignOut = () => {
  return (
    <div>
        <button onClick={(e) => { auth.signOut(); }}>ログアウト</button>
    </div>
  )
}

export default SignOut