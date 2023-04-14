/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState } from 'react';

declare global {
    interface Window {
        ipcApi?: any;
    }
}

function App() {
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

    return (
        <>
            <h1>My Electron, React and ThreeJS template</h1>
            <form onSubmit={RunSQL}>
                <label>Run: </label>
                <input type="text" value={runInputValue} onChange={onRunInputChange} />
            </form>
            <button onClick={ShowAllTables}>Show All Tables</button>
        </>
    );
}

export default App;
