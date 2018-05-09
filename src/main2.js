"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
//import the template
var _menuTemplate_1 = require("./ menuTemplate");
require("dotenv").config();
//console.log("I am in main3");
//console.log(`Your current directory is: ${__dirname}`);
// //electron reload for debug mode
// require('electron-reload')([__dirname,
//     `${__dirname}/*.js}`], {
//   electron: require(`${modifyPath()}/node_modules/electron`),
//   hardResetMethod: 'quit'
// });
// require('electron-reload')([__dirname,
//   `${__dirname}/*.js`],{
//   electron: require(`${modifyPath()}/node_modules/electron`)
// })
// try {
//   require('electron-reloader')(module);
// } catch (error) {
// }
var mainWindow;
function modifyPath() {
    var myPath = __dirname;
    return (myPath.replace("/dist", ""));
}
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 800,
        show: false,
        //backgroundColor: "#3afff5",
        center: true,
        minWidth: 800,
        minHeight: 600,
        // fullscreen:false,
        title: "Michael's Home Page"
        //frame:false,
        //titleBarStyle: "hidden"
    });
    //reload on key press
    electron_1.globalShortcut.register('f5', function () {
        //console.log('Refresh the main window');
        mainWindow.reload();
    });
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
    }));
    // Open the DevTools.
    if (process.env.showDevTools === "true") {
        mainWindow.webContents.openDevTools();
    }
    else {
        console.log('Show Development Window is turned off!');
    }
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        //Unregister the ky 
        electron_1.globalShortcut.unregister("f5");
        mainWindow = null;
    });
    mainWindow.once("ready-to-show", function () {
        mainWindow.show();
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", function () {
    //Create a windows menu
    // let template = [{
    //   label: 'File',
    //   submenu: [{
    //     label: 'Close App(With Role)',
    //     accelerator: 'CmdOrCtrl+X',
    //     role: 'quit'
    //   }, { type: 'separator' },
    //   {
    //     label: 'Reload Window',
    //     accelerator: 'F6',
    //     role: 'reload'
    //   },
    //   {
    //     label: 'Close app with Function',
    //     click: () => {
    //       app.quit();
    //     }
    //   }
    //   ]
    // },
    // {
    //   label: "Testing",
    //   submenu: [{
    //     label: 'Item 1',
    //     type: 'checkbox',
    //     checked: false,
    //     click: () => {
    //       //let menu = Menu.getApplicationMenu();
    //       //console.log(menu.items[1].submenu.items[0].checked);
    //     }
    //   }, {
    //     label: 'Item 2',
    //     type: 'checkbox',
    //     checked: false
    //   }
    //   ]
    // }
    // ];
    _menuTemplate_1.AddMenuBringToFront(_menuTemplate_1.template, 3);
    console.log(_menuTemplate_1.template);
    var menu = electron_1.Menu.buildFromTemplate(_menuTemplate_1.template);
    electron_1.Menu.setApplicationMenu(menu);
    createWindow();
});
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
