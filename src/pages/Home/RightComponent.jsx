import React from 'react'

export const RightComponent = () => {
    return (
        <div className='p-5 bg-night-blue text-light-purple'>
            {/* Header Section */}
            <div className='flex justify-between py-2 border-b-2 border-charcoal'>
                <h1 className='text-light-purple'>My Workspace</h1>
                <button className='flex justify-center items-center bg-coral text-night-blue px-3 py-2 rounded'>
                    <i className='fas fa-folder-plus mr-2'></i>
                    <span>New Folder</span>
                </button>
            </div>

            {/* Folder Container */}
            <div className='mt-5 bg-dark-gray p-4 rounded'>
                <div className='flex justify-between border-b border-charcoal py-5'>
                    {/* Left side of the folder header */}
                    <div className='flex gap-5 items-center'>
                        <i className='fas fa-folder text-ice-blue'></i>
                        <span className='text-pale-blue'>My Python Proj</span>
                    </div>

                    {/* Right side of the folder header */}
                    <div className='flex gap-5 items-center'>
                        <i className='fas fa-trash text-red cursor-pointer'></i>
                        <i className='fas fa-edit text-light-purple-alt cursor-pointer'></i>
                        <button className='bg-hot-pink text-night-blue px-3 py-2 rounded flex items-center'>
                            <i className='fas fa-plus mr-2'></i>
                            <span>New Workspace</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Cards Container */}
            <div className='cards-container mt-5 grid grid-cols-2 gap-4'>
                {/* Sample Compact Card 1 */}
                <div className='bg-dark-gray p-3 rounded flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow'>
                    <div>
                        <h2 className='text-pale-blue text-sm font-semibold'>File 1</h2>
                        <p className='text-light-purple-alt text-xs'>Brief description of File 1.</p>
                    </div>
                    <div className='flex justify-end mt-2'>
                        <button className='flex items-center bg-light-purple-alt text-night-blue px-2 py-1 rounded mr-1'>
                            <i className='fas fa-edit text-xs mr-1'></i>
                        </button>
                        <button className='flex items-center bg-red text-white px-2 py-1 rounded'>
                            <i className='fas fa-trash text-xs mr-1'></i>
                        </button>
                    </div>
                </div>

                {/* Sample Compact Card 2 */}
                <div className='bg-dark-gray p-3 rounded flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow'>
                    <div>
                        <h2 className='text-pale-blue text-sm font-semibold'>File 2</h2>
                        <p className='text-light-purple-alt text-xs'>Brief description of File 2.</p>
                    </div>
                    <div className='flex justify-end mt-2'>
                        <button className='flex items-center bg-light-purple-alt text-night-blue px-2 py-1 rounded mr-1'>
                            <i className='fas fa-edit text-xs mr-1'></i>
                        </button>
                        <button className='flex items-center bg-red text-white px-2 py-1 rounded'>
                            <i className='fas fa-trash text-xs mr-1'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
