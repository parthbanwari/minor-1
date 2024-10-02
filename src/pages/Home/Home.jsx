import React from 'react'

import { RightComponent } from './RightComponent'

const Home = () => {
    return (
        <div className='home-container grid grid-cols-[3fr_4fr] h-screen bg-red-500'>
            {/* Left Container */}
            <div className='Left-container flex justify-center items-center bg-white'>
                <div className='items-left flex flex-col items-center gap-5 text-black'>
                    <h1>SynCode</h1>
                    <h3>Code.Collaborate.Communicate</h3>
                    <button className='flex items-center justify-center bg-red-500 cursor-pointer h-12 w-[90%] rounded-full border-none transition-all duration-1000 text-xl hover:shadow-lg'>
                        <span className='material-symbols-outlined'>add</span>
                        <span>Create workSpace</span>
                    </button>
                </div>
            </div>

            {/* Right Component */}
            <RightComponent />
        </div>
    )
}

export default Home
