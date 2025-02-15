## Setup Instructions

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Run the application: `npm start`

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Run the application: `uvicorn main:app --reload`

### Follow the link for [Backend Source Code](https://github.com/Uzair-Manzoor/query-docs-backend.git)
### Follow the link for [Live Demo](https://ask-openai-theta.vercel.app/)

## API Documentation

### Upload PDF
- Endpoint: `/upload`
- Method: `POST`
- Body: `file` (form-data)

### Ask Question
- Endpoint: `/ask`
- Method: `POST`
- Body: `filename`, `question`

## Application Overview
The application allows users to upload PDF documents and ask questions about their content. The backend uses FastAPI to handle requests and LangChain for NLP processing. The frontend is built with React.js.
