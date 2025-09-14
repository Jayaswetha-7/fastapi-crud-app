import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Fruit(BaseModel):
    id: int | None = None
    name: str

class Fruits(BaseModel):
    fruits: List[Fruit]

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

memory_db = {"fruits": []}

@app.get("/")
def home():
    return {"name": "swetha"}

@app.get("/fruits", response_model=Fruits)
def get_fruit():
    return Fruits(fruits=memory_db["fruits"])

@app.post("/fruits", response_model=Fruit)
def add_fruit(fruit: Fruit):
    if fruit.id is None:
        fruit.id = len(memory_db["fruits"]) + 1  # simple auto-increment
    memory_db['fruits'].append(fruit)
    return fruit

@app.put("/fruits/{fruit_id}", response_model=Fruit)
def update_fruit(fruit_id: int, fruit: Fruit):
    for idx, f in enumerate(memory_db["fruits"]):
        if f.id == fruit_id:
            memory_db["fruits"][idx] = fruit
            return fruit
    raise HTTPException(status_code=404, detail="Fruit not found")

@app.delete("/fruits/{fruit_id}", response_model=Fruit)
def delete_fruit(fruit_id: int):
    for idx, f in enumerate(memory_db["fruits"]):
        if f.id == fruit_id:
            deleted = memory_db["fruits"].pop(idx)
            return deleted
    raise HTTPException(status_code=404, detail="Fruit not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
