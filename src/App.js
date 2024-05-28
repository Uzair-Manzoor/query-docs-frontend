import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

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
        try {
            const response = await axios.post('http://localhost:8000/ask', {
                filename,
                question,
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div className="App">
            <h1>Document Query App</h1>
            <div className="upload-section">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload PDF</button>
            </div>
            <div className="question-section">
                <input type="text" value={question} onChange={handleQuestionChange} placeholder="Ask a question" />
                <button onClick={handleAsk}>Ask</button>
            </div>
            {answer && <p className="answer">Answer: {answer}</p>}
        </div>
    );
}

export default App;
