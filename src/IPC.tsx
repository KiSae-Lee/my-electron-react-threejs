/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataBaseProps {
    columns: string[][];
    values: string[][];
}

const ExecuteSQL = (query: string, fn?: (data: any) => void) => {
    window.ipcApi.send('run-sql', query);
    window.ipcApi.receive('sql-return-run-sql', (out: never[]) => {
        window.ipcApi.log('info', `Received data from main process`);
        window.ipcApi.log('info', out);
        window.ipcApi.removeListeners('sql-return-run-sql');

        if (fn !== undefined) fn(out);
    });
};

export default ExecuteSQL;
