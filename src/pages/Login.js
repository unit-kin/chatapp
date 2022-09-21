import React from 'react'
import { useState,Navigate } from 'react'

import '../pages/Login.css'
/* import Uploadimg from '../images/Uploadimg.png' */
import { Link,useNavigate } from 'react-router-dom'
import { getAuth , signInWithEmailAndPassword} from 'firebase/auth'


export const Login = () => {

  const auth =getAuth();
    const[error, setError] =useState(false);
    const navigate =useNavigate()



    const handleSubmit = async(e) =>{
        e.preventDefault();

        
        const email = e.target[0].value;
        const password = e.target[1].value;
        

        try{
  
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        }catch(error){
        setError(true)
        }
     
    }
    

  return (
    <div className='container1-reg'>
        <div className='form-wrapper'>
            <div className='p-reg'>
                <p className='form-pa1'>Circa</p>
                <p className='form-pa2'>Sign-In</p>
            </div>
            
            <form className='form' onSubmit={handleSubmit}>
                <input type='email'placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <button className='reg-btn'>Sign In</button>
                {error && <span>An Error Occurred</span>}
            </form>

            <p className='form-pa3'>You don't have an Account?
            <Link to='/Sign-Up'>
            Sign-Up
            </Link>
             </p>

        </div> 
    </div>
     
  )
}
