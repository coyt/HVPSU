//This will spin up a local express server and host our REST API endpoint for other devices on the local network to use. 


const express = require('express');
const ipc = require('electron').ipcRenderer;
const app = express();
const port = 3000

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(port, () => console.log('Gator app listening on port 3000!'));

ipc.on('message', (event, message) => {
    console.log(message); // logs out "Hello second window!"
    console.log("*** STOPPING NS ***");
    //backgroundServer.close();
})