import { Menu } from 'electron';
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var jquery = require('jquery');

jquery("#myText").text("Welcome to my world of data! Wow this is way too cool!");

jquery("#myButton").click(() => {

    jquery("#myText").text("You just pressed the button! I changed the text!");

    jquery(document).attr("title", "Welcome to Michael's world of Electron!");

});

//Remote context menu

const { remote } = require('electron')
const { Menu } = remote;

const myContextMenu = Menu.buildFromTemplate([
    {
        label:'Cut',
        accelerator: "CmdOr+Ctrl+X",
        role:"cut"
    },
    {
        label:'Copy',
        accelerator: "CmdOr+Ctrl+C",
        role:"copy"
    },
    {
        label:'Paste',
        accelerator: "CmdOr+Ctrl+V",
        role:"paste"
    },
    {
        label:'Select All',
        accelerator: "CmdOr+Ctrl+A",
        role:"selectall"
    },
    {
        type:'separator'
    },
    {
        label: 'Custom',
        click: ()=>{ console.log('Custom click')}
    }
]);

window.addEventListener('contextmenu',(event)=>{
    event.preventDefault();
    myContextMenu.popup();
});


