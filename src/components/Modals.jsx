import React from 'react'

const Modal = ({ isOpen, onClose, title, onSave, children }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-dark-gray p-5 rounded shadow-lg w-1/3'>
                <h2 className='text-light-purple text-lg font-bold mb-4'>
                    {title}
                </h2>
                <div>{children}</div>
                <div className='flex justify-end mt-4'>
                    <button
                        className='bg-red text-white px-4 py-2 rounded mr-2'
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className='bg-coral text-night-blue px-4 py-2 rounded'
                        onClick={onSave}
                    >
                        {title === 'Confirm Deletion' ? 'Delete' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
