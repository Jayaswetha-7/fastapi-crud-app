import { useState, useEffect } from "react";
import AddFruit from "./AddFruit";
import api from "../api";
import * as React from "react";

// Define Fruit type
type FruitType = {
  name: string;
};


const Fruit = () => {
  const [fruits, setFruits] = useState<FruitType[]>([]);

  // Fetch fruits from API
  const fetchFruits = async (): Promise<void> => {
    try {
      const response = await api.get("/fruits");
      setFruits(response.data.fruits);
    } catch (error) {
      console.log("Error fetching fruits:", error);
    }
  };

  const addFruit = async (fruitName: string): Promise<void> => {
    if (!fruitName) return;
    try {
      const response = await api.post<FruitType>("/fruits", { name: fruitName });
      fetchFruits(); 
      setFruits((prev) => [...prev, response.data]);
    } catch (error) {
      console.log("Error adding fruit:", error);
    }
  };


  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <div>
      <h2>Fruits List</h2>
      <ul>
        {fruits.map((fruit: { name: any; }, index: string | number) => (
          <li key={index}>{fruit.name}</li>
        ))}
      </ul>
      <AddFruit addFruit={addFruit} />
    </div>
  );
};

export default Fruit;
