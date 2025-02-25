import { CreateNote, DeleteNote, GetNotes, OpenExternal, ReadNote, WriteNote } from '@shared/types';
import { contextBridge, ipcRenderer } from 'electron';

try {
    contextBridge.exposeInMainWorld('context', {
        locale: navigator.language,
        getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
        readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
        writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
        createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
        deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
        openExternal: (...args: Parameters<OpenExternal>) => ipcRenderer.invoke('openExternal', ...args),
        updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
    });
} catch (error) {
    console.log('🚀error---->', error);
}
