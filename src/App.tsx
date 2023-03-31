// import from packages.
import React from "react";

// import from files.
import { Button } from "./button/Button";

// import styles.
import styles from "./App.module.css";

function App() {
  return (
    <div className="App">
      <h1 className={styles.title}>My Electron, React and ThreeJS!</h1>
      <Button text="myButton"></Button>
    </div>
  );
}

export default App;
