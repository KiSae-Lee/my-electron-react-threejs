import * as path from 'path';
import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';

const BASE_URL = 'https://localhost:3000';

let mainWindow: BrowserWindow | null;

function createMainWindow(): void {
  console.log("Creating Main window...")
  console.log(isDev ? "Open in Development mode!" : "Open in Build mode!")

  mainWindow = new BrowserWindow({
    width: 1920,

    height: 1080,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    console.log("Show Main window!")
  });

  if (isDev) {
    console.log("Electron is in development mode!");
    console.log(`Trying to connect ${BASE_URL}`)
    mainWindow.loadURL(BASE_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.on('closed', (): void => {
    mainWindow = null;
  });
}

app.on('ready', (): void => {
  createMainWindow();
});

app.on('window-all-closed', (): void => {
  app.quit();
});

app.on('activate', (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});