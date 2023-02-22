import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { useState } from 'react'
const SignInSignUp = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleOnClick = () => { 
        setIsLogin(prevIsLogin => !prevIsLogin);
    }

    return (
        <div>
            <button onClick={handleOnClick}>{isLogin ? "Sign Up" : "Sign In"}</button>
            {isLogin ? <SignIn /> : <SignUp />} 
        </div>
    );
};


export default SignInSignUp