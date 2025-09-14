import { useState, useEffect } from "react";
import AddFruit from "./AddFruit";
import UpdateFruit from "./UpdateFruit";
import api from "../api";
import * as React from "react";

type FruitType = {
  id: number;
  name: string;
};

const Fruit = () => {
  const [fruits, setFruits] = useState<FruitType[]>([]);
  const [selectedFruit, setSelectedFruit] = useState<FruitType | null>(null); // currently selected fruit

  const fetchFruits = async (): Promise<void> => {
    try {
      const response = await api.get("/fruits");
      setFruits(response.data.fruits);
    } catch (error) {
      console.log("Error fetching fruits:", error);
    }
  };

  const updateFruit = async (id: number, name: string): Promise<void> => {
    try {
      await api.put(`/fruits/${id}`, { id, name });
      setSelectedFruit(null); // hide update form after updating
      fetchFruits();
    } catch (error) {
      console.log("Error while updating fruit:", error);
    }
  };

  const addFruit = async (fruitName: string): Promise<void> => {
    if (!fruitName) return;
    try {
      const response = await api.post<FruitType>("/fruits", { name: fruitName });
      setFruits((prev) => [...prev, response.data]);
    } catch (error) {
      console.log("Error adding fruit:", error);
    }
  };

  //delete fruit
  const deleteFruit = async (id: number): Promise<void> => {
    try {
      await api.delete(`/fruits/${id}`);
      setFruits(prev => prev.filter(fruit => fruit.id !== id));
    } catch (error) {
      console.log("Error deleting fruit:", error);
    }
  };
  

  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <div>
      <h2>Fruits List</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name}{" "}
            <button onClick={() => setSelectedFruit(fruit)}>Update</button>
            <button  onClick={() => deleteFruit(fruit.id)}  style={{ marginLeft: "10px" }}>
                 Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedFruit && (
        <div>
          <h3>Update Fruit</h3>
          <UpdateFruit updateFruit={updateFruit} fruit={selectedFruit} />
        </div>
      )}

      <h3>Add a New Fruit</h3>
      <AddFruit addFruit={addFruit} />
    </div>
  );
};

export default Fruit;
