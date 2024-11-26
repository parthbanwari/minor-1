import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import { initSocket } from '../../../socket.js'
import toast from 'react-hot-toast'
import Editor from '../../components/Editor.jsx'
import { Box, HStack } from '@chakra-ui/react'
import Language from '../Editor/Language.jsx'
import { CODE_SNIPPETS } from '../../constants.js'
import Output from '../Collab/Output.jsx'

const CollabEditorPage = () => {
    const socketRef = useRef() // Ref for socket connection
    const location = useLocation()
    const editorRef = useRef(null) // Ref for the editor

    const [value, setValue] = useState(CODE_SNIPPETS['python']) // Code value
    const { roomId } = useParams()
    const reactNavigator = useNavigate()

    const [clients, setClients] = useState([]) // List of connected clients
    const [language, setLanguage] = useState('python') // Language of the editor
    const [theme, setTheme] = useState('oneDark') // Theme of the editor

    // Language selection callback
    const onSelect = (newLanguage) => {
        setLanguage(newLanguage)
        setValue(CODE_SNIPPETS[newLanguage])
    }

    // Initialize socket and event listeners
    useEffect(() => {
        const init = async () => {
            try {
                socketRef.current = await initSocket()
                console.log('Socket initialized successfully')

                // Join the room
                socketRef.current.emit('join', {
                    roomId,
                    username: location.state?.username,
                })

                // Handle joining event
                socketRef.current.on('joined', ({ clients, username }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} has joined!`)
                    }
                    setClients(clients)
                })

                // Handle code changes from other clients
                socketRef.current.on('code_change', ({ code }) => {
                    if (
                        editorRef.current &&
                        editorRef.current.getValue() !== code
                    ) {
                        editorRef.current.setValue(code)
                    }
                })

                // Handle client disconnection
                socketRef.current.on(
                    'disconnected',
                    ({ socketId, username }) => {
                        toast.success(`${username} has left the room.`)
                        setClients((prev) =>
                            prev.filter(
                                (client) => client.socketId !== socketId
                            )
                        )
                    }
                )
            } catch (error) {
                console.error('Socket initialization error:', error)
                toast.error('Socket connection failed. Redirecting to home.')
                reactNavigator('/')
            }
        }

        init()

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
                socketRef.current.off('join')
                socketRef.current.off('code_change')
                socketRef.current.off('disconnected')
            }
        }
    }, [roomId, location.state?.username, reactNavigator])

    // Redirect if location state is missing
    if (!location.state) {
        return <Navigate to='/' />
    }

    return (
        <Box minH='100vh' bg='#282e43' color='grey.500' px={6} pu={8}>
            <HStack spacing={4}>
                {/* Code editor section */}
                <Box w='50%'>
                    <Language language={language} onSelect={onSelect} />
                    <div className='w-full h-full text-xl overflow-auto'>
                        <Editor
                            language={language}
                            theme={theme}
                            socket={socketRef.current}
                            roomId={roomId}
                            setValue={setValue}
                            value={value}
                        />
                    </div>
                </Box>
                {/* Output section */}
                <Output
                    editorRef={editorRef}
                    language={language}
                    scode={value}
                />
            </HStack>
        </Box>
    )
}

export default CollabEditorPage
