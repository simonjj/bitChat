from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Dict
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def serve_root():
    index_path = os.path.join("static", "index.html")
    return FileResponse(index_path)

model_id = "microsoft/bitnet-b1.58-2B-4T"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
)
model.eval()

def generate_response(messages: List[Dict[str, str]], max_new_tokens: int = 50) -> str:
    chat_input = tokenizer.apply_chat_template(
        messages, tokenize=True, add_generation_prompt=True, return_tensors="pt"
    ).to(model.device)
    with torch.no_grad():
        chat_outputs = model.generate(chat_input, max_new_tokens=max_new_tokens)
    response = tokenizer.decode(chat_outputs[0][chat_input.shape[-1]:], skip_special_tokens=True)
    return response

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    max_new_tokens: int = 50

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    response = generate_response(request.messages, request.max_new_tokens)
    return {"response": response}
