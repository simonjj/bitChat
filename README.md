# 🦾 bitChat: BitNet Demo Chat App

Welcome to **bitChat** — your friendly, minimal, and modern AI chat demo powered by Microsoft Research’s BitNet! This project is a real-life implementation of the BitNet paper, showing off how you can chat with a cutting-edge 1-bit Transformer model in a ChatGPT-style UI. 🚀

---

## ✨ Features
- 🧑‍💻 Minimal, modern chat UI (React + Vite)
- 🤖 Real-time chat with BitNet (Microsoft Research)
- ⚡ FastAPI backend for model inference
- 🤝 Hugging Face Transformers integration
- 🐳 Dockerized for easy deployment (Azure-ready!)
- 🧩 Model selection UI (extensible)

---

## 🚀 Quick Start

### Prerequisites
- 🐳 Docker
- 🟢 Node.js (for local frontend dev)
- 🐍 Python 3.11+ (for local backend dev)

### Local Development
1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-org/bitChat.git
   cd bitChat
   ```
2. **Frontend:**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
3. **Backend:**
   ```sh
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
4. **Open [http://localhost:5173](http://localhost:5173) and start chatting!**

### Docker Build & Run
```sh
docker build -t bitchat:latest .
docker run -p 8000:8000 bitchat:latest
```

### Azure Container Apps
- Build and push the image to Azure Container Registry
- Deploy using Azure Portal or CLI

---

## 🧠 Model & Paper
- **BitNet Paper:** [BitNet: Training 1-bit Transformers for Large Language Models](https://arxiv.org/abs/2403.00704)
- **Model:** [microsoft/bitnet-b1.58-2B-4T on Hugging Face](https://huggingface.co/microsoft/bitnet-b1.58-2B-4T)

---

## 🗂️ Project Structure
```
bitChat/
├── Dockerfile
├── main.py           # FastAPI backend
├── inference.py      # Model inference logic
├── requirements.txt
├── frontend/         # React + Vite frontend
└── static/           # Built frontend assets (served by backend)
```

---

## 📄 License
This project is MIT licensed. See [LICENSE](./LICENSE) for details.

---

## 💙 Credits
- [BitNet Paper, Microsoft Research](https://arxiv.org/abs/2403.00704)
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)

---

> 🧪 **This is a demo project for research and educational fun. Not production-ready!**
