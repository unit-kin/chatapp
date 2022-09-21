import React from 'react'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'

import '../pages/Home.css'

export const Home = () => {
  return (
    <div className='Home-container1'>
        <div className='Chat-container2'>
            <Sidebar/>
            <Chat/>

        </div>
    </div>
  )
}
