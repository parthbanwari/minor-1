import { io } from 'socket.io-client'

export const initSocket = async () => {
    const options = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    if (!backendUrl) {
        throw new Error('Backend URL is not defined in environment variables')
    }

    return io(backendUrl, options)
}
