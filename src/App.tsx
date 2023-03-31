// import from packages.
import React from "react";

// import from files.
import { Button } from "./Elements/Button";
import { ToDoList } from "./Components/ToDoList";
import { CoinTracker } from "./Components/CoinTracker";

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
        <ToDoList />
        <CoinTracker />
    </div>
  );
}

export default App;
