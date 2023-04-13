import React, { useEffect, useState } from "react";
import * as log from "electron-log"

declare global {
  interface Window {
    myApi?: any;
  }
}

function App() {
  useEffect(() => {
    window.myApi.send("all-tables");
    window.myApi.log("info", "Send Channel: all-tables");
  }, []);

  window.myApi.receive("sql-return-all-tables", (data: any[]) => {
    window.myApi.log(`Received data from main process`);
    window.myApi.log("info", data);
    window.myApi.removeListeners("sql-return-all-tables");
  });

  return (
    <>
      <h1>My Electron, React and ThreeJS template</h1>
    </>
  );
}

export default App;
