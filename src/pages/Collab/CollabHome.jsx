import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

const CollabHome = () => {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    const createRoom = () => {
        const id = uuid();
        setRoomId(id);

        toast.success('New room ID created.');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Fill all fields...');
            return;
        }
        navigate(`/collab/${roomId}`, {
            state: {
                username,
            },
        });
    };

    return (
        <div
            className="w-screen h-screen flex select-none"
            style={{
                backgroundColor: '#1a1b26', // Tokyo Night dark background
            }}
        >
            {/* Left Section */}
            <div
                className="text-primary flex-1 flex flex-col items-center justify-center text-center p-10"
                style={{
                    backgroundColor: '#24283b', // Secondary Tokyo Night color
                    color: '#c0caf5', // Soft text color
                }}
            >
                <div>
                    <div
                        className="text-7xl m-4 font-bold"
                        style={{
                            color: '#7aa2f7', // Header color
                        }}
                    >
                        SynCode
                    </div>
                    <div
                        className="text-xl font-semibold"
                        style={{
                            color: '#9aa5ce', // Subdued text color
                        }}
                    >
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

            {/* Right Section */}
            <div
                className="w-1/3 flex flex-col items-center justify-center"
                style={{
                    backgroundColor: '#1a1b26', // Primary dark background
                    color: '#c0caf5',
                }}
            >
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Room Code"
                        className="px-4 p-2 rounded-lg font-semibold outline-none focus:outline-soft"
                        style={{
                            backgroundColor: '#2c3042', // Input background
                            color: '#c0caf5',
                            border: '1px solid #7aa2f7',
                        }}
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="px-4 p-2 rounded-lg font-semibold outline-none focus:outline-soft"
                        style={{
                            backgroundColor: '#2c3042', // Input background
                            color: '#c0caf5',
                            border: '1px solid #7aa2f7',
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="font-bold rounded-lg px-4 p-1"
                            onClick={createRoom}
                            style={{
                                backgroundColor: '#bb9af7',
                                color: '#1a1b26',
                                boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
                            }}
                        >
                            Generate Room
                        </button>
                        <button
                            type="submit"
                            className="font-bold rounded-lg px-4 p-1"
                            onClick={joinRoom}
                            style={{
                                backgroundColor: '#ff757f',
                                color: '#1a1b26',
                                boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
                            }}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollabHome;
