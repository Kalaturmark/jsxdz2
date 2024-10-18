import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
    const [name, setName] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('user_name_changed', (data) => {
            setMessages((prev) => [...prev, `User ${data.id} changed name to: ${data.name}`]);
        });

        return () => {
            socket.off('user_name_changed');
        };
    }, []);

    const handleChangeName = () => {
        if (name) {
            socket.emit('change_name', name); 
            setCurrentName(name); 
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Change User Name</h1>

            {/* Поле ввода для имени пользователя */}
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '20px',
                }}
            />

            {/* Кнопка для изменения имени */}
            <br />
            <button
                onClick={handleChangeName}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                Change Name
            </button>

            {/* Отображение текущего имени пользователя */}
            {currentName && <h2>Your current name is: {currentName}</h2>}

            {/* Список сообщений о изменении имени */}
            <div style={{ marginTop: '30px' }}>
                <h3>Messages:</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {messages.map((msg, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            {msg}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
