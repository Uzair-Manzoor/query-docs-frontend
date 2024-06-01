import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      showNotification('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://query-docs-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFilename(response.data.filename);
      showNotification('File uploaded successfully');
    } catch (error) {
      showNotification('Error uploading file');
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAsk = async () => {
    if (!filename) {
      showNotification('No file uploaded');
      return;
    }

    if (!question) {
      showNotification('Please enter a question');
      return;
    }

    try {
      const response = await axios.post(
        'https://query-docs-backend.onrender.com/ask',
        { filename, question }, // Pass filename and question as an object
      );
      const { answer } = response.data;
      setChat((prevChat) => [...prevChat, {
        id: new Date().getTime(), question, answer, isError: false,
      }]);
      setQuestion('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error asking question';
      setChat((prevChat) => [...prevChat, {
        id: new Date().getTime(), question, answer: errorMessage, isError: true,
      }]);
      showNotification(errorMessage);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="AI Planet Logo" className="logo" />
          <div className="navbar-content-button">
            <input type="file" onChange={handleFileChange} className="file-input" />
            <button onClick={handleUpload} className="upload-button" type="button">
              <span className="plus">+</span>
              <span className="text">Upload PDF</span>
            </button>
          </div>
        </div>
      </nav>
      {notification && <div className="notification">{notification}</div>}
      <div className="chat-screen">
        {chat.map((item) => (
          <div key={item.id} className={`chat-item ${item.isError ? 'error' : ''}`}>
            <p className="question">
              user:
              {' '}
              {item.question}
            </p>
            <p className="answer">
              AI:
              {' '}
              {item.answer}
            </p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          id="questionInput"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask a question"
        />
        <button className="ask-button" onClick={handleAsk} type="button">
          Ask
        </button>
      </div>
    </div>
  );
}

export default App;
