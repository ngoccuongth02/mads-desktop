import { createNote, deleteNote, getNotes, readNote, writeNote } from '@/lib';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types';
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater'; // Auto-update module
import { join } from 'path';
import icon from '../../resources/icon.icns?asset';

// Function to create the main application window
function createMainWindow(): BrowserWindow {
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 1024,
        show: false, // Window is hidden until ready to show
        autoHideMenuBar: false,
        center: true,
        title: 'Mads Sat',
        frame: false, // Frameless window for custom title bars
        vibrancy: 'under-window', // macOS effect
        visualEffectState: 'active',
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 15, y: 10 }, // macOS traffic light buttons positioning
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'), // Preload script
            sandbox: true, // Security feature
            contextIsolation: true, // Isolation between renderer and Node.js
        },
    });

    // Show the window once it's ready
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    // Open external URLs in the default browser
    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // Load the renderer: remote URL in dev, local HTML in prod
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }

    return mainWindow;
}

// Handle app-level events and setup
function setupAppEvents(): void {
    // Ensure the app quits when all windows are closed (except on macOS)
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });

    // Recreate a window when the app is activated (macOS)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
}

// Setup IPC (Inter-Process Communication) handlers
function setupIpcHandlers(): void {
    ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args));
    ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args));
    ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args));
    ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args));
    ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args));
}

// Setup auto-update functionality
function setupAutoUpdate(): void {
    autoUpdater.on('checking-for-update', () => {
        console.log('Checking for updates...');
    });

    autoUpdater.on('update-available', (info) => {
        console.log('Update available:', info);
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new update is available. It will be downloaded in the background.',
        });
    });

    autoUpdater.on('update-not-available', (info) => {
        console.log('No updates available:', info);
    });

    autoUpdater.on('error', (error) => {
        console.error('Error during update:', error);
        dialog.showErrorBox('Update Error', error == null ? 'Unknown error' : (error.stack || error).toString());
    });

    autoUpdater.on('download-progress', (progressObj) => {
        console.log(`Download speed: ${progressObj.bytesPerSecond}`);
        console.log(`Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`);
    });

    autoUpdater.on('update-downloaded', () => {
        const result = dialog.showMessageBoxSync({
            type: 'question',
            buttons: ['Install and Restart', 'Later'],
            defaultId: 0,
            cancelId: 1,
            title: 'Update Ready',
            message: 'The update has been downloaded. Would you like to install it now?',
        });

        if (result === 0) {
            autoUpdater.quitAndInstall();
        }
    });

    // Start checking for updates
    autoUpdater.checkForUpdatesAndNotify();
}

// Main function to initialize the app
function initializeApp(): void {
    app.whenReady().then(() => {
        // Set app user model ID for Windows (required for notifications, taskbar, etc.)
        electronApp.setAppUserModelId('com.electron');

        // Optimize dev tools and shortcuts
        app.on('browser-window-created', (_, window) => {
            optimizer.watchWindowShortcuts(window);
        });

        // Setup IPC handlers
        setupIpcHandlers();

        // Setup auto-update
        setupAutoUpdate();

        // Create the main application window
        createMainWindow();
    });

    // Setup other app-level events
    setupAppEvents();
}

// Initialize the application
initializeApp();
