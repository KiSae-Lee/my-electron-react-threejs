import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use.
// the ipcRenderer without exposing the entire object.
contextBridge.exposeInMainWorld("myApi", {
  send: (channel: string, data: any[]) => {
    // whitelist channels
    let validChannels = ["latest-query"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: any) => {
    let validChannels = ["sql-return-latest"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args)});
    }
  },
  removeListeners: (channel: string) => {
    let validChannels = ["sql-return-latest"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.removeAllListeners(channel);
    }
  },
});
