import React, { useState, useContext } from 'react'
import './Input.css'

import Attach from '../images/attach.png'

import {RiAttachmentLine} from 'react-icons/ri'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'

import {collection, arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc ,addDoc} from 'firebase/firestore'
import {v4 as uuid} from 'uuid'
import {db,storage } from '../firebase'

import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';


const InputPanel = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await setDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      )
    } else {
      await setDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className='Input'>

      <input type='text' placeholder='Type something...' className='input1' onChange={(e) => setText(e.target.value)}
        value={text}/>
      
      <input  className='photoin' style={{display:'none'}} type='file' id='inputfile' onChange={(e)=>setImg(e.target.files[0])}/>
      <label htmlFor='inputfile' className='attachdocs'>
        <img src={Attach} alt=''/>
      </label>

      <button type='submit' onClick={handleSend}>
        <span>Send</span>
      </button>

    </div>
  )
}

export default InputPanel