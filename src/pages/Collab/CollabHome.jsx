import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'

const CollabHome = () => {
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('')

    const navigate = useNavigate()

    const createRoom = () => {
        const id = uuid()
        setRoomId(id)

        toast.success('new room id created.')
    }

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('fill all fields...')
            return
        }
        navigate(`/collab/${roomId}`, {
            state: {
                username,
            },
        })
    }

    return (
        <div className='w-screen h-screen flex select-none bg-dusk'>
            <div className=' text-primary bg-soft  w-2/3 h-full flex flex-col items-center justify-center text-center p-10'>
                <div>
                    <div className='text-7xl m-4 font-bold border-4 border-primary'>
                        synCode
                    </div>
                    <div className='text-xl font-semibold text-balance'>
                        A real-time code collaboration app allows multiple users
                        to simultaneously edit code in a shared environment.
                        Users can see each other's changes in real-time, making
                        it an ideal tool for pair programming, coding
                        interviews, and collaborative coding projects. It's
                        built using React for the frontend, Node.js and Express
                        for the backend, and Socket.IO for real-time
                        communication.
                    </div>
                </div>
            </div>
            <div className='bg-primary w-1/3 flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-4'>
                    <input
                        type='text'
                        placeholder='Room Code'
                        className='px-4 p-2 rounded-lg font-semibold outline-none focus:outline-soft'
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        className='px-4 p-2 rounded-lg font-semibold outline-none focus:outline-soft'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className='flex items-center justify-between'>
                        <button
                            type='submit'
                            className=' font-bold bg-soft rounded-lg px-4 p-1'
                            onClick={createRoom}
                        >
                            Generate Room
                        </button>
                        <button
                            type='submit'
                            className=' font-bold bg-[#FF7F50] rounded-lg px-4 p-1'
                            onClick={joinRoom}
                        >
                            Join
                        </button>
                    </div>
                </div>
                    <i className='fa-brands fa-github' />
            </div>
        </div>
    )
}

export default CollabHome
