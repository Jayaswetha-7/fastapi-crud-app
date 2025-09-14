import * as React from "react";
import { useState } from "react";

type AddFruitProps = {
  addFruit: (name: string) => void;
};

const AddFruit = (props: AddFruitProps) => {
  const [fruitName, setFruitName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fruitName) {
      props.addFruit(fruitName);
      setFruitName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        placeholder="Enter fruit name"
      />
      <button type="submit">Add Fruit</button>
    </form>
  );
};

export default AddFruit;
