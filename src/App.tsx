// import from packages.
import React from "react";
// Switch => Routes
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import from files.
import Home from "./routes/Home";
import { ToDoList } from "./Example Components/ToDoList";
import { CoinTracker } from "./Example Components/CoinTracker";
import { MovieViewer, MovieDetail } from "./Example Components/MovieViewer";
// import styles.
import styles from "./App.module.css";

function App() {
  console.log("Create App!");

  return (
    <div className="App">
      <Router>
      <h1 className={styles.title}>My Electron, React and ThreeJS!</h1>
      <h3><Link to="/">Back to Home</Link></h3>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/to-do-list" element={<ToDoList />} />
          <Route path="/coin-tracker" element={<CoinTracker />} />
          <Route path="/movie-viewer" element={<MovieViewer />} />
        {<Route path="/movie-viewer/:id" element={<MovieDetail />} />}
        </Routes>
      </Router>
    </div>
  );
  
}

export default App;
