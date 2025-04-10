Amatle.com
Amatle.com is a web app that answers user questions about Homeowners Association (HOA) rules.

This project was built as a way to learn and experiment with Retrieval-Augmented Generation (RAG) using LangChain, OpenAI, and pgvector. Users can choose from three HOA documents and ask questions in a simple, chat-like interface — for example, “How many dogs can I have?”

Features
🏡 Select from 3 HOA documents

💬 Chat-style interface (similar to ChatGPT)

🔍 Ask natural-language questions

🤖 Answers generated using OpenAI + LangChain

🧪 Built as a personal learning project

Tech Stack
Frontend

React

Vite

React Router DOM

Backend

Node.js

Express

LangChain

OpenAI

PostgreSQL + pgvector

Other

Multer (file handling)

pdf-parse (PDF reader)

dotenv

cors

morgan

Project Structure
bash
Copy
Edit
/frontend   → React client (Vite)
/backend    → Node.js + Express server
Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/amatle.com.git
cd amatle.com
2. Setup Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

3. Setup Backend
bash
Copy
Edit
cd backend
npm install
node server.js
Environment Variables (Backend)
Create a .env file inside the backend folder:

env
Copy
Edit
FRONTEND_ORIGIN=http://localhost:5173

PG_USER=your_user
PG_HOST=localhost
PG_DATABASE=your_database
PG_PASSWORD=your_password
PG_PORT=5432

OPENAI_API_KEY=your_openai_key
Usage
Open the homepage

Choose one of the HOA documents

Type your question (e.g., “Can I build a fence?”)

The app responds based on that document
