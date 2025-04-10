Amatle.com
Amatle.com is a web app that answers user questions about Homeowners Association (HOA) rules.

This project was built as a way to learn and experiment with Retrieval-Augmented Generation (RAG) using LangChain, OpenAI, and pgvector. Users can choose from three HOA documents and ask questions in a chat-style interface — for example, “How many dogs can I have?”

Live Site: https://amatle.com
(Add your real link if hosted)

Features
🏡 Select from 3 HOA documents

💬 Chat-style interface (like ChatGPT)

🤖 Answers powered by OpenAI and LangChain

🧪 Built from scratch as a learning project

Tech Stack
Frontend

React

Vite

React Router DOM

Backend

Node.js

Express

PostgreSQL + pgvector

LangChain

OpenAI

Other

pdf-parse

Multer

dotenv

cors

morgan

Project Structure
/frontend → React client
/backend → Node.js + Express server

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
3. Setup Backend
bash
Copy
Edit
cd backend
npm install
node server.js
Backend .env (example)
env
Copy
Edit
FRONTEND_ORIGIN=http://localhost:5173
PG_USER=your_user
PG_HOST=localhost
PG_DATABASE=your_db
PG_PASSWORD=your_password
PG_PORT=5432
OPENAI_API_KEY=your_openai_key
Usage
Open the homepage

Select one of the HOA documents

Ask a question like “How many pets can I have?”

The app responds based on that document
