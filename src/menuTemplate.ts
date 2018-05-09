//This is a menu template
import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

let electron = require("electron");
let app: any;


export const template = [{
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
}, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item: any, focusedWindow: any) {

            if (focusedWindow) {
                // on reload, start fresh and close any old
                // open secondary windows
                if (focusedWindow.id === 1) {
                    BrowserWindow.getAllWindows().forEach(function (win) {
                        if (win.id > 1) {
                            win.close()
                        }
                    })
                }
                focusedWindow.reload()
            }
        }
    }, {
        label: 'Toggle Full Screen',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: function (item: any, focusedWindow: any) {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }, {
        label: 'Toggle Developer Tools',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Alt+Command+I'
            } else {
                return 'Ctrl+Shift+I'
            }
        })(),
        click: function (item: any, focusedWindow: any) {
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
}, {
    label: 'Window',
    role: 'window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
    }, {

        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    }, {
        type: 'separator'
    }, {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: function () {
            app.emit('activate')
        }
    }]
}, {
    label: 'Help',
    role: 'help',
    submenu: [{
        label: 'Learn More',
        click: function () {
            electron.shell.openExternal('http://electron.atom.io')
        }
    }]
}]

//Add a submenu to the main template
export function AddMenuBringToFront(template: Array<any>, index: number) {

    template[index].submenu.push({
        type: 'separator'
    }, {
            label: "Bring All to Front",
            role: 'front'
        });
}
