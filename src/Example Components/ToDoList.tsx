import React from "react";
import { Button } from "../Elements/Button";

export function ToDoList() {
  // TODO: Fix the re-render issue.
  console.log("Create ToDoList!");

  const [toDo, setToDo] = React.useState("");
  const [toDos, setToDos] = React.useState<string[]>([]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (toDo === "") {
      return;
    }

    console.log(toDo);
    setToDos((current) => [...current, toDo]);
    setToDo((current) => (current = ""));
  };

  React.useEffect(() => {
    console.log(`To Do List: ${toDos}`);
  }, [toDos]);

  return (
    <div>
        <h2>My To Do List - Total Count: {toDos.length}</h2>
      <form onSubmit={onSubmit}>
        <input
          value={toDo}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setToDo(event.target.value);
          }}
          type="text"
          placeholder="Write your To Do..."
        />
        <Button text="Add To Do" />
      </form>
      <hr />
      {toDos.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
}
