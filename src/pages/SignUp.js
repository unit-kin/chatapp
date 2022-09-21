import React, { useState } from 'react'

import {getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import '../pages/SignUp.css'
import Uploadimg from '../images/Uploadimg.png'
import { Link, useNavigate } from 'react-router-dom'
import { db, storage } from '../firebase';
import {ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore'



export const SignUp = () => {
    const auth =getAuth();
    const[error, setError] =useState(false);
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate()



    const handleSubmit = async(e) =>{
        setLoading(true);
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
      
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
      
            await uploadBytesResumable(storageRef, file).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });
      
                  //create empty user chats on firestore
                  await setDoc(doc(db, "userChats", res.user.uid), {});
                  navigate("/");
                } catch (error) {
                  console.log(error);
                  setError(true);
                  setLoading(false);
                }
              });
            });
          } catch (error) {
            setError(true);
            setLoading(false);
          }
     
    }

  return (
    <div className='container1-reg'>
        <div className='form-wrapper'>
            <div className='p-reg'>
                <p className='form-pa1'>Circa</p>
                <p className='form-pa2'>Register</p>
            </div>
            
            <form className='form' onSubmit={handleSubmit}>
                <input type="text" placeholder='Chat Name'></input>
                <input type='email'placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <input style={{display:'none'}} type='file' id='file'/>
                <label  htmlFor='file' className='form-label'>
                    <img src={Uploadimg} alt='' className='form-img'/>
                    <span>Upload Image</span>
                </label>
                <button disabled={loading} className='reg-btn'>Sign Up</button>
                {loading && "Uploading and compressing the image please wait..."}
                {error && <span>An Error Occurred</span>}
            </form>

            <p className='form-pa3'>You have an Account? 
            <Link to='/Login'>
             Login
            </Link>
            </p>

        </div>
    </div>
     
  )
}
