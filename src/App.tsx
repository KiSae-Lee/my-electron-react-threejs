import React, { useState } from 'react';

function App() {
  const [click, setClick] = useState('');
  const clickButton = () => {
    setClick('click');
  };

  return (
    <>
      <h1>My Electron, React and ThreeJS template</h1>
      <button onClick={clickButton}>button</button>
      {click}
    </>
  );
}

export default App;