import * as React from "react";
import { useState } from "react";

type UpdateFruitProps = {
   updateFruit: (fruit_id: number, name: string) => void;
   fruit: {id:number, name: string};
};

const UpdateFruit = ({updateFruit, fruit}: UpdateFruitProps) => {
  const [fruitName, setFruitName] = useState(fruit.name);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fruitName) {
      updateFruit(fruit.id, fruitName)
    }
  };

  return (
    <form onSubmit={handlerSubmit}>
      <input
        type="text"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        placeholder="Update your fruit name"
      />
      <button type="submit">Update Fruit</button>
    </form>
  );
};

export default UpdateFruit;
