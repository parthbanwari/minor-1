import React from 'react'
import Explorer from './Explorer'
import LeftComponent from './LeftComponent'

const Home = () => {
    return (
        <div className='home-container grid grid-cols-[3fr_4fr] h-screen bg-night-blue'>
            <LeftComponent />
            <Explorer />
        </div>
    )
}

export default Home
