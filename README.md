# Amatle.com

Amatle.com is a web app that answers user questions about Homeowners Association (HOA) rules.

This project was built to learn and experiment with Retrieval-Augmented Generation (RAG) using LangChain, OpenAI, and pgvector.  
Users can choose from three HOA documents and ask questions like “How many dogs can I have?”

Live Site: [https://amatle.com](https://amatle.com)  
Hosted on (add your host, e.g. AWS)

---

## Features

- 🏡 Select from 3 HOA documents  
- 💬 Chat-style interface (like ChatGPT)  
- 🤖 Answers powered by OpenAI and LangChain  
- 🧪 Built from scratch as a learning project

---

## Tech Stack

**Frontend**
- React  
- Vite  
- React Router DOM

**Backend**
- Node.js  
- Express  
- PostgreSQL + pgvector  
- LangChain  
- OpenAI

**Other**
- pdf-parse  
- Multer  
- dotenv  
- cors  
- morgan

---

## Project Structure

`/frontend` → React client  
`/backend` → Node.js + Express server

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/amatle.com.git
cd amatle.com
