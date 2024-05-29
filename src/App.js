import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFilename(response.data.filename);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAsk = async () => {
        const userMessage = { sender: 'user', text: question };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:8000/ask', {
                filename,
                question,
            });
            const aiMessage = { sender: 'ai', text: response.data.answer };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error asking question:', error);
        }
        setQuestion('');
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="App">
            <nav className="navbar">
                <div className="navbar-content">
                    <img src={logo} alt="AI Planet Logo" className="logo" />
                    <input type="file" onChange={handleFileChange} className="file-input" />
                    <button onClick={handleUpload} className="upload-button">Upload PDF</button>
                </div>
            </nav>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`chat-message ${message.sender}`}>
                            {message.text}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Ask a question"
                        className="question-input"
                    />
                    <button onClick={handleAsk} className="ask-button">Ask</button>
                </div>
            </div>
        </div>
    );
}

export default App;
