import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <h3>Examples</h3>
      <ul>
        <li>
          <Link to="/to-do-list">To Do List</Link>
        </li>
        <li>
          <Link to="/coin-tracker">Coin Tracker</Link>
        </li>
        <li>
          <Link to="/movie-viewer">Movie Viewer</Link>
        </li>
      </ul>
    </div>
  );
}
