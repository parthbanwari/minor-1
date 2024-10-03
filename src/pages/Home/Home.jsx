import React from 'react'
import RightComponent from './RightComponent'
import LeftComponent from './LeftComponent'

const Home = () => {
    return (
        <div className='home-container grid grid-cols-[3fr_4fr] h-screen bg-night-blue'>
            <LeftComponent />
            <RightComponent />
        </div>
    )
}

export default Home
