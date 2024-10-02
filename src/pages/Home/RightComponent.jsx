import React from 'react'

export const RightComponent = () => {
    return (
        <div className='p-5'>
            {/* Header Section */}
            <div className='header flex justify-between py-2 border-b-2 border-black'>
                <h1>My Workspace</h1>
                <button className='add-folder flex justify-center items-center bg-red-500 border-none'>
                    <span className='material-symbols-outlined'>add</span>
                    <span>New Folder</span>
                </button>
            </div>

            {/* Folder Container */}
            <div className='folder-container mt-5'>
                <div className='folder-header flex justify-between border-b border-black py-5'>
                    {/* Left side of the folder header */}
                    <div className='folder-header-item flex gap-5 items-center'>
                        <span className='material-symbols-outlined'>
                            folder
                        </span>
                        <span>My Python Proj</span>
                    </div>

                    {/* Right side of the folder header */}
                    <div className='folder-header-item flex gap-5 items-center'>
                        <span className='material-symbols-outlined'>
                            delete
                        </span>
                        <span className='material-symbols-outlined'>edit</span>
                        <button className='bg-red-500 border-none flex items-center'>
                            <span className='material-symbols-outlined'>
                                add
                            </span>
                            <span>New Workspace</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Cards Container */}
            <div className='cards-container mt-5'>
                {/* Add your card elements here */}
            </div>
        </div>
    )
}
