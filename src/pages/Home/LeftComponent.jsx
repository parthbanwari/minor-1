import React from 'react'

const LeftComponent = () => {
    return (
        <div className='left-container flex justify-center items-center bg-dusk'>
            <div className='items-left flex flex-col items-center gap-5 text-light-purple'>
                <h1 className='text-pale-blue text-4xl'>synCode</h1>
                <h3 className='text-light-purple-alt'>
                    Code. Collaborate. Communicate
                </h3>
                <button className='flex items-center justify-center bg-coral cursor-pointer h-12 w-[90%] rounded-full border-none transition-all duration-300 text-xl hover:shadow-lg text-night-blue'>
                    <i className='fas fa-plus mr-2'></i>
                    <span>Create Workspace</span>
                </button>
            </div>
        </div>
    )
}

export default LeftComponent
