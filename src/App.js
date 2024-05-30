import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [chat, setChat] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

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
        if (!filename) {
            console.error('No file uploaded');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/ask', new URLSearchParams({
                filename,
                question,
            }));
            const answer = response.data.answer;
            setChat((prevChat) => [...prevChat, { question, answer }]);
            setQuestion('');
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div className="App">
            <nav className="navbar">
                <div className="navbar-content">
                    <img src={logo} alt="AI Planet Logo" className="logo" />
                    <div className="navbar-content-button">
                      <input type="file" onChange={handleFileChange} className="file-input" />
                      <button onClick={handleUpload} className="upload-button">
                      <span className="plus">+</span >
                      <span className="text">Upload PDF</span>
                      </button>
                    </div>
                </div>
            </nav>
            <div className="chat-screen">
                {chat.map((item, index) => (
                    <div key={index} className="chat-item">
                        <p className="question">Q: {item.question}</p>
                        <p className="answer">A: {item.answer}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Ask a question"
                />
                <button className="ask-button" onClick={handleAsk}>Ask</button>
            </div>
        </div>
    );
}

export default App;
