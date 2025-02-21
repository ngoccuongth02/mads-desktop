import { app, BrowserWindow } from 'electron';
import { autoUpdater, ProgressInfo, UpdateDownloadedEvent } from 'electron-updater';

export const init = (mainWindow: BrowserWindow): void => {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  initEvent(mainWindow);
  autoUpdater.checkForUpdates();
}

const initEvent = (mainWindow: BrowserWindow) => {
  autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('updateMessage', 'update-available');
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-not-available', () => {
    mainWindow?.webContents.send('updateMessage', `No update available. Current version ${app.getVersion()}`);
  });

  autoUpdater.on('download-progress', (progress: ProgressInfo) => {
    mainWindow?.webContents.send('updateMessage', `
      Updating: ${progress.transferred}/${progress.total} - ${progress.bytesPerSecond}/s - ${progress.percent} - ${progress.delta}
    `);
  });

  autoUpdater.on('update-downloaded', (event: UpdateDownloadedEvent) => {
    mainWindow?.webContents.send('updateMessage', `Update downloaded. Current version ${app.getVersion()} ${event}`);
  });

  autoUpdater.on('error', (info) => {
    mainWindow?.webContents.send('updateMessage', info.message);
  });

}
