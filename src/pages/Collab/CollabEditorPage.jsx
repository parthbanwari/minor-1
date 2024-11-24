import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'

import { initSocket } from '../../../socket.js'

import toast from 'react-hot-toast'
import Editor from '../../components/Editor.jsx'

const CollabEditorPage = () => {
    const socketRef = useRef()

    const location = useLocation()
    const { roomId } = useParams()

    const reactNavigator = useNavigate()

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket()

            socketRef.current.on('connection_error', (err) => handleError(err))
            socketRef.current.on('connection_failed', (err) => handleError(err))

            function handleError(e) {
                console.log('socket error', e)
                toast.error('socket connection failed ,try again later.')

                reactNavigator('/')
            }

            socketRef.current.emit('join', {
                roomId,
                username: location.state?.username,
            })

            //join event
            socketRef.current.on(
                'joined',
                ({ clients, username }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} has joined!`)
                        console.log(`${username} has joined!`)
                    }

                    setClients(clients)
                }
            )

            //disconnect event
            socketRef.current.on('disconnected', ({ socketId, username }) => {
                toast.success(`${username} has left the room.`)
                setClients((prev) => {
                    return prev.filter((client) => client.socketId !== socketId)
                })
            })
        }

        init()

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
                socketRef.current.off('join')
                socketRef.current.off('disconnected')
            }
        }
    }, [])

    const [clients, setClients] = useState([])

    const [language, setLanguage] = useState('text')
    const [theme, setTheme] = useState('oneDark')
    const [showConnected, setShowConnected] = useState(false)

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value)
    }

    const handleThemeChange = (event) => {
        setTheme(event.target.value)
    }

    const handleLeave = () => {
        reactNavigator('/')
    }

    const handleMouseEnter = () => {
        setShowConnected(true)
    }

    const handleMouseLeave = () => {
        setShowConnected(false)
    }

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId)
            toast.success('room id copied.')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const [dateTime, setDateTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatDateTime = (date) => {
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' }
        return date.toLocaleDateString('en-US', options)
    }

    if (!location.state) {
        return <Navigate to='/' />
    }
    return (
        <div className='w-screen h-screen bg-primary flex flex-col overflow-hidden'>
            <div className='w-full h-full text-xl overflow-auto'>
                <Editor
                    language={language}
                    theme={theme}
                    socket={socketRef.current}
                    roomId={roomId}
                />
            </div>

            <div className='bg-soft w-full flex justify-between  relative select-none'>
                <div className=' font-bold flex gap-4'>
                    <div
                        onClick={copyRoomId}
                        className='bg-[white] px-6 cursor-pointer'
                    >
                        <i className='fa-solid fa-copy' />
                    </div>
                    {formatDateTime(dateTime)}
                </div>

                <div className='flex'>
                    <div className='mr-4'>
                        <select
                            onChange={handleThemeChange}
                            value={theme}
                            className='bg-soft font-bold mx-2'
                        >
                            <option value='oneDark'>One Dark</option>
                            <option value='dracula'>Dracula</option>
                            <option value='amy'>Amy</option>
                            <option value='barf'>Barf</option>
                            <option value='coolGlow'>Cool Glow</option>
                        </select>
                        <select
                            onChange={handleLanguageChange}
                            value={language}
                            className='bg-soft   font-bold mx-2'
                        >
                            <option value='javascript'>JavaScript</option>
                            <option value='python'>Python</option>
                            <option value='text'>Text</option>
                        </select>
                    </div>

                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className=' bg-white'>
                            <i className='fa-solid fa-users px-6' />
                        </div>
                        {showConnected && (
                            <div className='absolute bottom-full right-0 m-4 bg-white p-2 border-2 border-gray-300'>
                                <span className='font-semibold'>
                                    CONNECTED USERS:
                                </span>
                                <hr />
                                {clients.map((c) => (
                                    <div
                                        className='select-none text-primary font-semibold text-lg'
                                        key={c.id}
                                    >
                                        &bull; {c.username}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        onClick={handleLeave}
                        className='bg-[#FF7F50] px-6 cursor-pointer'
                    >
                        <i className='fa-solid fa-right-from-bracket' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollabEditorPage
