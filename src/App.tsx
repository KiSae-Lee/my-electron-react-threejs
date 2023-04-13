import React, { useEffect } from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        myApi?: any;
    }
}

function App() {
    useEffect(() => {
        window.myApi.send('all-tables');
        window.myApi.log('info', 'Send Channel: all-tables');
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.myApi.receive('sql-return-all-tables', (data: any[]) => {
        window.myApi.log(`Received data from main process`);
        window.myApi.log('info', data);
        window.myApi.removeListeners('sql-return-all-tables');
    });

    return (
        <>
            <h1>My Electron, React and ThreeJS template</h1>
        </>
    );
}

export default App;
