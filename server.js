import express from 'express'
import path from 'path'
import http from 'http'

import { Server } from 'socket.io'

const app = express()

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'dist')))
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const server = http.createServer(app)
const io = new Server(server)

const userSocketMap = {}

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            }
        }
    )
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id)

    socket.on('join', ({ roomId, username }) => {
        userSocketMap[socket.id] = username
        socket.join(roomId)

        const clients = getAllConnectedClients(roomId)
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit('joined', {
                clients,
                username,
                socketId: socket.id,
            })
        })
    })

    socket.on('code_change', ({ roomId, code }) => {
        socket.to(roomId).emit('code_update', { code })
    })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id]
        socket.leave()
    })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log('listening on PORT: ', PORT)
})
