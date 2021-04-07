//GUI application for network control of the High Voltage Power Supply

const { app, BrowserWindow, Menu, ipcMain} = require('electron')

app.on('ready', () => {

  //create the "main" window in the 1st renderer thread
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true
    }
  })

  //load index.html inside browser window
  mainWindow.loadFile('index.html')

  //attach event handler to kill entire app if main window is closed
  mainWindow.on("close", () => {
    mainWindow = null;
    app.quit();
  });

  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);

})


//if all windows are closed, kill the app. 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


//prevents too many windows from being created?
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// Attach listener in the main process with the given ID to srtart the network server
ipcMain.on('request-mainprocess-action-start-network-server', (event, arg) => {

  console.log(arg);
 
  //create a new HIDDEN window (and thus new thread) to hold the network server
  var backgroundServer = new BrowserWindow({
    show: false,
    webPreferences: { backgroundThrottling: false, contextIsolation: false, nodeIntegrationInWorker: true, nodeIntegration: true }
  });

  //make the background server global so we can control it easier
  global.backgroundServer = backgroundServer;

  //load a dummy HTML file that loads the "script" where the express HTTP server will run
  //to make sure it's safe in it's own thread separate from the GUI 
  backgroundServer.loadFile('RESTserver.html')

});


// Attach listener in the main process to kill the network server if front-end GUI says so
ipcMain.on('request-mainprocess-action-stop-network-server', (event, arg) => {
  console.log(arg);
  backgroundServer.close(); //this works because backgroundServer is global
});


// Create menu  template
const mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label: 'Add Item'
      },
      {
        label: 'Clear Item'
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];


//if mac, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}


//add developer toosl if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}