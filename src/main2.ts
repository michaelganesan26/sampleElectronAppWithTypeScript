import { app, BrowserWindow, globalShortcut, Menu, MenuItem, ipcMain, Dialog } from "electron";
import * as path from "path";
import * as url from "url";

//import the template
import { template as mgTemplate, AddMenuBringToFront as mgAddMenuBringToFront, CreateContextMenu } from "./menuTemplate";




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


let mainWindow: Electron.BrowserWindow;
let contextMenu: Menu;

function modifyPath() {

  let myPath: string = __dirname;

  return (myPath.replace("/dist", ""));

}



function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
  globalShortcut.register('f5', () => {
    //console.log('Refresh the main window');
    mainWindow.reload();
  });


  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file:",
    slashes: true,
  }));

  // Open the DevTools.
  if (process.env.showDevTools === "true") {
    mainWindow.webContents.openDevTools();
  }
  else {
    console.log('Show Development Window is turned off!');

  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    //Unregister the ky 
    globalShortcut.unregister("f5");
    mainWindow = null;

    //remove the ipcMain listeners
    ipcMain.removeAllListeners("pingMessage");
    ipcMain.removeAllListeners("show-context-menu");


  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
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



  mgAddMenuBringToFront(mgTemplate, 1);
  const menu = Menu.buildFromTemplate(<any>mgTemplate);
  Menu.setApplicationMenu(menu);

  contextMenu = CreateContextMenu()

  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.





ipcMain.on("show-context-menu", (event: any) => {


  const win = BrowserWindow.fromWebContents(event.sender);

  //send message to window
  win.webContents.send('message', { data: 'Wow this is way too cool from main process' });

  contextMenu.popup(win);

});

//Main message from 

ipcMain.on("pingMessage", (event: any, msg: string) => {

  console.log(`Received ping message from client! ${msg}`);
  //always send the channel for the reply! 
  event.sender.send('pingMessageReply', `Received your message from the server: ${new Date().toUTCString()}`);



});

