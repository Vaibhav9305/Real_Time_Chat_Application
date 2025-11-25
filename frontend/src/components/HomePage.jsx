import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

function HomePage() {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hiddenbg-gray-400/20 backdrop-blur-lg bg-clip-padding
'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage
