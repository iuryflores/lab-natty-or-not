import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newMessage = {
            user: 'user',
            text: input
        };

        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:9000/api/chat', {
                message: input,
                userId: 'user1' // Pode ser um ID dinâmico ou fixo
            });

            console.log('Resposta do backend:', response.data);

            const botMessage = {
                user: 'bot',
                text: response.data.message
            };

            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error("Erro ao enviar mensagem", error);
        }

        setInput('');
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Chat;
