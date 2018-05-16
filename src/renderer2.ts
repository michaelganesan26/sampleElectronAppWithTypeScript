// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Note: Added code for ipc between the main process and the renderer


import { remote, ipcRenderer } from "electron";

import *  as _ from 'lodash';



var jquery = require('jquery');

jquery("#myText").text("Welcome to my world of data! Wow this is way too cool!");

jquery("#myButton").click(() => {

    jquery("#myText").text("You just pressed the button! I changed the text!");

    jquery(document).attr("title", "Welcome to Michael's world of Electron!");

});


window.addEventListener("contextmenu", (event: MouseEvent) => {

    event.preventDefault();
    ipcRenderer.send("show-context-menu");

});

ipcRenderer.on("message", (event: any, message: any) => {
    console.log(`${event}`);
    console.log(`Your message is: ${message.data} coming from main process!`);
});

//ping main process
jquery('#sendAsyncMessage').click((event: any) => {

    let msg = new Date().toUTCString();
    ipcRenderer.send("pingMessage", `Ping message from client ${msg}`);

});

ipcRenderer.on("pingMessageReply", (event: any, msg: any) => {
    console.log(`Received message from server ${msg}`);
    jquery("#asyncReply").html(`Ping Results from Main ${msg}`);

});

//Show dialog 
const selectDirBtn = document.getElementById("btnselectDirectory");

selectDirBtn.addEventListener("click", (event: any) => {

    ipcRenderer.send("open-directory-dialog");



});

ipcRenderer.on("selectedItem", (event: any, files: any) => {
    console.log('Open file dialog');

    document.getElementById("selectedItem").innerHTML = `You selected: ${files}`;

});

//Open the file dialog from within the web page
document.getElementById("btnOpenFileDialog").addEventListener("click", (event: any) => {

    console.log("open the file dialog via the web page");

    let filters = [
        { name: "Images", extensions: ['jpg', 'png', 'gif'] },
        { name: "Movies", extensions: ['mkv', 'avi', 'mp4'] },
        { name: "Custom File Types", extensions: ['as'] },
        { name: "All Files", extensions: ['*'] }
    ];



    let defaultPath:string = "/home/ganesanm/Flutter";

    
    remote.dialog.showOpenDialog({
        properties: ["openFile"],
        title: "Open via Web Page (Michael Ganesan)",
        filters: filters,
        defaultPath: defaultPath || "/home/ganesanm"
    }, (files: any) => {

        if (files) {

            document.getElementById("selectedPath").innerHTML = files;
        }
    });
});

//Open a message box

let images = [
    {
        name: "bicycle", path: "../images/bicycle.png"
    },
    {
        name: "bomb", path: "../images/bomb.png"
    },
    {
        name: "cycling", path: "../images/cycling.png"
    },
    {
        name: "glock", path: "../images/glockgun.png"
    },
    {
        name: "motorcycle", path: "../images/motorcycle.png"
    },
    {
        name: "slackIcon", path: "../images/slackIcon.png"
    },
    {
        name: "sheepOnBike", path: "../images/sheepOnBike.png"
    }
];

//Open dialog box 

document.getElementById("btnShowMessageBox").addEventListener("click",(event:any)=>{
    //find the icon sheepOnBike
    let sheep = _.find(images,{name:"sheepOnBike"});
     console.log(sheep.path);





});











































































































































































































































































































































































































































































