import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Chats from './Chats'

import './Sidebar.css'


import { signOut, getAuth } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from 'firebase/firestore'
import {db } from '../firebase'
import { async } from '@firebase/util'



export const Sidebar = () => {
    const auth=getAuth()
    const {currentUser} =useContext(AuthContext)
    const [username, setUserName] =useState('')
    const [user, setUser] =useState(null)
    const [error, setError] =useState(false)




    const handleSearch = async() =>{
        const q =query(
            collection(db, 'users'), 
        where('displayName','==', username)
        );

        try{
        const querySnapshot =await getDocs(q)
        querySnapshot.forEach((doc) =>{
         setUser(doc.data())
        });
    }catch(error){
        setError(true)
    }

    };
  
    const handleKey =(e)=>{
        e.code ==="Enter" && handleSearch();
    }

    const handleSelect = async() =>{
        //check if group exists, if not create new 
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid 
        
        try{
            const res=await getDoc(doc(db,'Chats', combinedId));

            if(!res.exists()){
                //create a chat in the chats collection
                await setDoc(doc(db, 'Chats', combinedId), {messages:[]});

                //ceate user chat
                await updateDoc(doc(db,'userChats', currentUser.uid),{
                    [combinedId+'.userInfo']: {
                        uid:user.uid,
                        displayName:user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId+'.date']:serverTimestamp()
                });

                await updateDoc(doc(db,'userChats', user.uid),{
                    [combinedId+'.userInfo']: {
                        uid:currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+'.date']:serverTimestamp()
                });

            }
        }catch(error){}


       setUser(null)
       setUserName('')
            
        
    }
  return (
    <div className='Sidebar'>
        <div className='Side-nav'>
            <span className='span1'>Circa</span>
            <div className='prof-details'>
                <img src={currentUser.photoURL} alt=''/>
                <span>{currentUser.displayName}</span>
                    
                        <button onClick={() =>signOut(auth)}>
                            Logout
                        </button>
                    
            </div>
            
        </div>
        <div className='Chats-box'>
            <div className='search-form'>
                <input 
                type='text' 
                placeholder='Find Contact' 
                onKeyDown={handleKey} 
                onChange={(e) =>setUserName(e.target.value)}
                value={username}
                /> 
            </div>

            {error && <span style={{color:'lightgrey'}}>User not found</span>}
            { user && (<div className='userchats' onClick={handleSelect}>
                <img src={user.photoURL} alt=''/>
                <div className='Contact-name'>
                    <span>{user.displayName}</span>
                   
                </div>
            </div>
            )}
            <hr></hr>
            
            <Chats/>
        

        </div>

    </div>
    
  )
}
