/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from 'electron';
import * as log from 'electron-log';

// Expose protected methods that allow the renderer process to use.
// the ipcRenderer without exposing the entire object.
contextBridge.exposeInMainWorld('myApi', {
    send: (channel: string, data: any[]) => {
        // whitelist channels
        const validChannels = ['execute-sql', 'run-sql'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel: string, func: any) => {
        const validChannels = ['sql-return-execute-sql', 'sql-return-run-sql'];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => {
                func(...args);
            });
        }
    },
    removeListeners: (channel: string) => {
        const validChannels = ['sql-return-execute-sql', 'sql-return-run-sql'];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.removeAllListeners(channel);
        }
    },
    log: (chanel: 'info' | 'error' | 'warn' | 'verbose' | 'debug' | 'silly', message: string) => {
        switch (chanel) {
            case 'info':
                log.info(message);
                break;
            case 'error':
                log.error(message);
                break;
            case 'warn':
                log.warn(message);
                break;
            case 'verbose':
                log.verbose(message);
                break;
            case 'debug':
                log.debug(message);
                break;
            case 'silly':
                log.silly(message);
                break;
        }
    },
});
