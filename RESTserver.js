//This will spin up a local express server and host our REST API endpoint for other devices on the local network to use. 


const express = require('express');
const ipc = require('electron').ipcRenderer;
const app = express();

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));

ipc.on('message', (event, message) => {
    console.log(message); // logs out "Hello second window!"
    console.log("*** STOPPING NS ***");
    //backgroundServer.close();
})