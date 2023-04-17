/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import Counter from './Redux Example/Counter';

declare global {
    interface Window {
        ipcApi?: any;
    }
}

function App() {
    // SQL Examples.
    const [runInputValue, setRunInputValue] = useState<string>('');

    const onRunInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRunInputValue(event.target.value);
    };

    const RunSQL = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.ipcApi.log('info', 'Input has been submitted!');
        window.ipcApi.send('run-sql', runInputValue);

        window.ipcApi.receive('sql-return-run-sql', (data: any[]) => {
            window.ipcApi.log('info', `Received data from main process`);
            window.ipcApi.log('info', data);
            window.ipcApi.removeListeners('sql-return-run-sql');
        });
    };

    const ShowAllTables = () => {
        window.ipcApi.send('run-sql', `SELECT name FROM sqlite_master WHERE type='table'`);
        window.ipcApi.receive('sql-return-run-sql', (data: any[]) => {
            window.ipcApi.log('info', `Received data from main process`);
            window.ipcApi.log('info', data);
            window.ipcApi.removeListeners('sql-return-run-sql');
        });
    };

    // Redux Examples.
    const [showElement, setShowElement] = useState(true);

    const handleClick = () => {
        setShowElement(false);
    };

    // Three Examples.
    function Box(props: JSX.IntrinsicElements['mesh']) {
        // This reference will give us direct access to the mesh
        const mesh = useRef<THREE.Mesh>(null);
        // Set up state for the hovered and active state
        const [hovered, setHover] = useState(false);
        const [active, setActive] = useState(false);
        // Subscribe this component to the render-loop, rotate the mesh every frame
        useFrame((state, delta) => (mesh.current !== null ? (mesh.current.rotation.x += delta) : null));
        // Return view, these are regular three.js elements expressed in JSX
        return (
            <mesh
                {...props}
                ref={mesh}
                scale={active ? 1.5 : 1}
                onClick={() => setActive(!active)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        );
    }

    return (
        <>
            <h1>My Electron, React and ThreeJS template</h1>
            <form onSubmit={RunSQL}>
                <label>Run: </label>
                <input type="text" value={runInputValue} onChange={onRunInputChange} />
            </form>
            <button onClick={ShowAllTables}>Show All Tables</button>
            <div>
                {showElement && <p>This element will be removed</p>}
                <button onClick={handleClick}>Remove Element</button>
            </div>
            <div>
                <Counter title="myCounter" />
            </div>
            <div
                style={{
                    height: '100vh',
                }}
            >
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Box />
                </Canvas>
            </div>
        </>
    );
}

export default App;
