// import from packages.
import React from "react";

// import from files.
import { Button } from "./Elements/Button";
import { ToDoList } from "./ToDoList/ToDoList";

// import styles.
import styles from "./App.module.css";

function App() {
  console.log("Create App!");
  return (
    <div>
      <div className="App">
        <h1 className={styles.title}>My Electron, React and ThreeJS!</h1>
        <Button text="myButton"></Button>
      </div>
      <div>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
