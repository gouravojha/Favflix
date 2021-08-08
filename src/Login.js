import React from 'react'
import "./App.css";
import bg from "./assets/bg.jpg";
import { auth,provider } from "./firebase";
import { login } from './features/userSlice';
import { useDispatch } from "react-redux";
function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) =>{
            dispatch(login({
                user:  result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            }))
        }).catch(error => alert(error.message))
    }
    return (
        <div >
        <img src={bg} alt="bg" className="login__hero" />
            <div className="login">
                <div className="login__logo">
                    <h1>Favflix</h1>
                </div>
                <div className="login__button">
                    <button type="submit" onClick={signIn}>
                        Sign In with Google
            </button>
                </div>
            </div>
        </div>
    )
}

export default Login
