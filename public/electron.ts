/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path';
import * as ELECTRON from 'electron';
import * as RemoteMain from '@electron/remote/main';
import * as isDev from 'electron-is-dev';
import * as log from 'electron-log';

// import * as DB from '../database/dbMethod.js'; // Get data function form database.

const BASE_URL = 'https://localhost:3000';

let mainWindow: ELECTRON.BrowserWindow | null;
RemoteMain.initialize();

function createMainWindow(): void {
    log.info('Creating Main window...');
    log.info(isDev ? 'Open in Development mode!' : 'Open in Build mode!');

    mainWindow = new ELECTRON.BrowserWindow({
        width: 1920,
        height: 1080,

        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            nativeWindowOpen: true,
            preload: path.join(__dirname, 'preload.js'),
            // preload: "./preload.ts"
        } as ELECTRON.WebPreferences,
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
        log.info('Show Main window!');
    });

    if (isDev) {
        log.info('Electron is in development mode!');
        log.info(`Trying to connect ${BASE_URL}`);
        mainWindow.loadURL(BASE_URL);
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }

    mainWindow.on('closed', (): void => {
        mainWindow = null;
    });
}

ELECTRON.app.on('ready', (): void => {
    createMainWindow();
});

ELECTRON.app.on('window-all-closed', (): void => {
    ELECTRON.app.quit();
});

ELECTRON.app.on('activate', (): void => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

// // IPC Setup for using SQL.

// ELECTRON.ipcMain.on('run-sql', async (event, arg) => {
//     log.info('ELECTRON: Running SLQ...');
//     log.info('ELECTRON: trying to run: ', arg);
//     await DB.RunSQL(arg)
//         .then((res: any) => event.sender.send('sql-return-run-sql', res))
//         .catch((error: any) => console.log(error));
// });
