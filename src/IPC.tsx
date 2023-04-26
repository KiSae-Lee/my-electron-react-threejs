/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DataBaseProps {
    columns: string[][];
    values: string[][];
}

export interface ItemProps {
    [index: number]: [number, string, string];
}

// const ExecuteSQL = (query: string, callback?: (data: any) => void) => {
//     window.ipcApi.send('run-sql', query);
//     window.ipcApi.receive('sql-return-run-sql', (out: never[]) => {
//         // window.ipcApi.log('info', `Received data from main process`);
//         // window.ipcApi.log('info', out);

//         if (callback !== undefined) callback(out);
//         window.ipcApi.removeListeners('sql-return-run-sql');
//     });
// };

const ExecuteSQL = <T,>(query: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        try {
            window.ipcApi.log('info', `ExecuteSQL: received query: ${query}`);
            window.ipcApi.send('run-sql', query);
            window.ipcApi.receive('sql-return-run-sql', (data: T[]) => {
                window.ipcApi.log('info', `ExecuteSQL: received result from RunSQL: `);
                window.ipcApi.log('info', data);
                resolve(data);

                window.ipcApi.removeListeners('sql-return-run-sql');
                window.ipcApi.log('info', `ExecuteSQL: Removing listener for 'sql-return-run-sql'`);
                window.ipcApi.log('info', `ExecuteSQL: JOB DONE!`);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export default ExecuteSQL;
