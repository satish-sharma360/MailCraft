import React from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
      <Navbar/>
      <div className='p-10 mt-16 md:px-28 lg:px-40 xl:px-56'>
        <div className='flex items-center justify-between mb-6'>
            <h2 className='font-medium text-3xl'>👋Hello ,{user.firstName} {user.lastName}</h2>
            <button className='px-6 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:scale-95'>+ Create New Email Template</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
