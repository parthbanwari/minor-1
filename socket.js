import { io } from 'socket.io-client'

export const initSocket = async () => {
    const options = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    }

    const backendUrl = 'https://syncode-owgr.onrender.com'

    if (!backendUrl) {
        throw new Error('Backend URL is not defined in environment variables')
    }

    return io(backendUrl, options)
}
