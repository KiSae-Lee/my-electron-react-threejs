/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useState } from 'react';

declare global {
    interface Window {
        myApi?: any;
    }
}

function App() {
    const [runInputValue, setRunInputValue] = useState<string>('');

    const onRunInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRunInputValue(event.target.value);
    };

    const RunSQL = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.myApi.log('info', 'Input has been submitted!');
        window.myApi.send('run-sql', runInputValue);

        window.myApi.receive('sql-return-run-sql', (data: any[]) => {
            window.myApi.log('info', `Received data from main process`);
            window.myApi.log('info', data);
            window.myApi.removeListeners('sql-return-run-sql');
        });
    };

    const ShowAllTables = () => {
        window.myApi.send('run-sql', `SELECT name FROM sqlite_master WHERE type='table'`);
        window.myApi.receive('sql-return-run-sql', (data: any[]) => {
            window.myApi.log('info', `Received data from main process`);
            window.myApi.log('info', data);
            window.myApi.removeListeners('sql-return-run-sql');
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
