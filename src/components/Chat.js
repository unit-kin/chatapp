import React, { useContext } from 'react'
import './Chat.css'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {IoPersonAddSharp} from 'react-icons/io5'
import {BsThreeDots} from 'react-icons/bs'

import Messages from './Messages'
import InputPanel from './InputPanel'

import {ChatContext} from '../context/ChatContext'

export const Chat = () => {
  const {data} =useContext(ChatContext)
  return (
    <div className='entire-chat'>
      <div className='top-bar'>
        <span className='Chating-name'>{data.user?.displayName}</span>
        <div className='top-icons'>
          <span><BsFillCameraVideoFill/></span>
          <span><IoPersonAddSharp/></span>
          <span><BsThreeDots/></span>
          

        </div>
      </div>
      <Messages/>
      <InputPanel/>
    </div>
    
    
        
    
    
    
    
    
  )
}
