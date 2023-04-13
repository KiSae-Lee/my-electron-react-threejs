import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";

declare global {
  interface Window {
    myApi?: any;
  }
}

function App() {
  interface PersonProps {
    ID: number;
    Name: string;
  }

  const [data, setData] = useState<PersonProps[]>([]);

  useEffect(() => {
    window.myApi.send("latest-query", "select * from Person");
  }, []);

  window.myApi.receive("sql-return-latest", (data: PersonProps[]) => {
    console.log(`Received data from main process`);
    console.table(data);
    setData(data);
    window.myApi.removeListeners("sql-return-latest");
  });

  return (
    <>
      <h1>My Electron, React and ThreeJS template</h1>
      <ul>{data && data.map((i) => <li key={i.ID}>{i.Name}</li>)}</ul>
    </>
  );
}

export default App;
