/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Panel from './Components/Panel';
import Viewport from './Components/Viewport';
import StatusBar from './Components/StatusBar';
// import Counter from './Redux Example/Counter';

// Color Palette:
// Rhapsody: #ec1943
// dune: #ffbb58
// ether: #4fc3f7
// dive: #24a1b2
// emperor: #545454
// gallery: #bababa
// silver: #ebebeb

declare global {
    interface Window {
        ipcApi?: any;
    }
}

function App() {
    const statusBarHeight = '20px';
    const panelWidth = '200px';

    // // SQL Examples.
    // const [runInputValue, setRunInputValue] = useState<string>('');

    // const onRunInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setRunInputValue(event.target.value);
    // };

    // const RunSQL = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     window.ipcApi.log('info', 'Input has been submitted!');
    //     window.ipcApi.send('run-sql', runInputValue);

    //     window.ipcApi.receive('sql-return-run-sql', (data: any[]) => {
    //         window.ipcApi.log('info', `Received data from main process`);
    //         window.ipcApi.log('info', data);
    //         window.ipcApi.removeListeners('sql-return-run-sql');
    //     });
    // };

    // const ShowAllTables = () => {
    //     window.ipcApi.send('run-sql', `SELECT name FROM sqlite_master WHERE type='table'`);
    //     window.ipcApi.receive('sql-return-run-sql', (data: any[]) => {
    //         window.ipcApi.log('info', `Received data from main process`);
    //         window.ipcApi.log('info', data);
    //         window.ipcApi.removeListeners('sql-return-run-sql');
    //     });
    // };

    return (
        <div
            className="appContainer"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
            }}
        >
            <div
                className="appFrame"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: `calc(100vh - ${statusBarHeight})`,
                    width: '100vw',
                }}
            >
                <Panel height={'100%'} width={'200px'} />
                <div
                    className="viewportFrame"
                    style={{
                        height: `calc(100vh - ${statusBarHeight})`,
                        width: `calc(100vw - ${panelWidth})`,
                    }}
                >
                    <Viewport />
                </div>
            </div>
            <StatusBar width={'100vw'} height={statusBarHeight} />
        </div>
    );
}

export default App;
