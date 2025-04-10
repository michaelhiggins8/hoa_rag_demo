Amatle.com
Amatle.com is a web app that answers user questions about Homeowners Association (HOA) rules. It’s built as a personal learning project to explore Retrieval-Augmented Generation (RAG) architecture using OpenAI and LangChain. Users can select one of three HOA documents and interact in a chat-like interface to find relevant information, such as “How many dogs can I have?”.

Features
Multiple HOA documents: Choose from three built-in HOA documents.

Chat-style interface: Ask questions in a familiar conversational UI.

RAG-based answers: Uses OpenAI and LangChain to retrieve relevant text from HOA docs.

Learning project: Built to practice RAG architecture, vector databases, and Node.js/React.

Tech Stack
Frontend: React (with Vite, React Router)

Backend: Node.js, Express, LangChain, OpenAI, Multer, pdf-parse

Database: PostgreSQL with pgvector

Other Tools: dotenv, cors, morgan

Getting Started
Prerequisites
Node.js installed on your machine.

PostgreSQL (for the database).

A .env file for backend configuration (details below).

Installation & Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/<YourUsername>/amatle.com.git
cd amatle.com
2. Backend Setup
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file (in the backend folder) with values for:

bash
Copy
Edit
FRONTEND_ORIGIN=http://localhost:5173  # or wherever your frontend is running
PG_USER=your_postgres_user
PG_HOST=localhost
PG_DATABASE=your_database_name
PG_PASSWORD=your_db_password
PG_PORT=5432
OPENAI_API_KEY=your_openai_api_key
Start the server:

bash
Copy
Edit
node server.js
The backend should now be running (by default on port 3000, if coded that way).

3. Frontend Setup
Open a new terminal in the root folder, then go to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Open your browser and visit the URL printed in the console (commonly http://localhost:5173).

Usage
Pick an HOA document: You’ll see an option to select one of three available HOA documents.

Ask questions: You’ll be taken to a chat-style interface where you can type your question (e.g., “How many dogs can I have?”).

Receive answers: The app uses RAG (Retrieval-Augmented Generation) to look up relevant text in the chosen HOA doc and provide a concise answer.
