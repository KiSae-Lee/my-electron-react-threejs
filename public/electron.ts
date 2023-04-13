import * as path from "path";
import * as ELECTRON from "electron";
import * as RemoteMain from "@electron/remote/main";
import * as isDev from "electron-is-dev";
import * as log from "electron-log"

import * as DB from "../database/dbMethod.js"// Get data function form database.

const BASE_URL = "https://localhost:3000";

let mainWindow: ELECTRON.BrowserWindow | null;
RemoteMain.initialize();

function createMainWindow(): void {
  log.info("Creating Main window...");
  log.info(isDev ? "Open in Development mode!" : "Open in Build mode!");

  mainWindow = new ELECTRON.BrowserWindow({
    width: 1920,
    height: 1080,

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      nativeWindowOpen: true,
      preload: path.join(__dirname, "preload.js"),
      // preload: "./preload.ts"
    } as ELECTRON.WebPreferences,
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
    log.info("Show Main window!");
  });

  if (isDev) {
    log.info("Electron is in development mode!");
    log.info(`Trying to connect ${BASE_URL}`);
    mainWindow.loadURL(BASE_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }

  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });
}

ELECTRON.app.on("ready", (): void => {
  createMainWindow();
});

ELECTRON.app.on("window-all-closed", (): void => {
  ELECTRON.app.quit();
});

ELECTRON.app.on("activate", (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// IPC Setup for using SQL.

ELECTRON.ipcMain.on("all-tables", (event, arg) => {
  log.info("query from renderer : ", arg);
  log.info("Get Tables!")
  DB.GetTables()
    .then((res) => event.sender.send("sql-return-all-tables", res))
    .catch((error) => console.log(error));
});

// ELECTRON.ipcMain.on("latest-query", (event, arg) => {
//   Log.info("query from renderer : ", arg);
//   DB.GetData(arg)
//     .then((res) => event.sender.send("sql-return-latest", res))
//     .catch((error) => console.log(error));
// });

// Examples:
// Asynchronous method.
// ipcMain.on("asynchronous-message", (event, arg) => {
//   console.log(arg); // print "ping".
//   event.reply("asynchronous-reply", "pong");
// });

// ipcMain.on("synchronous-message", (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = "pong";
// });

// Synchronous method.
// console.log(ipcRenderer.sendSync("synchronous-message", "ping")); // prints "pong".

// ipcRenderer.on("asynchronous-reply", (event, arg) => {
//   console.log(arg); // prints "pong"
// });

// ipcRenderer.send("asynchronous-message", "ping");
