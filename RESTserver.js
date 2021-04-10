//This will spin up a local express server and host our REST API endpoint for other devices on the local network to use. 
const express = require('express');
var nodeConsole = require('console');
const ipc = require('electron').ipcRenderer;
const bodyParser = require('body-parser');
const cors = require('cors');

var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const app = express();
const port = 3000

// Where we will keep books
let random = [];

app.use(cors());


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//callbacks for ROOT
app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});


//callbacks for RANDOM NUMBER RECEPTION
app.get('/randomvalue', (req, res) => {
    res.send('Received a GET HTTP method');
});

app.post('/randomvalue', (req, res) => {
    res.send('Received a POST HTTP method');

    const localRand = req.body;
    myConsole.log("*** WE JUST RECEIVED A RANDOM VALUE: ***");
    myConsole.log(localRand);
    ipc.send('randomValue',localRand);
});

app.put('/randomvalue', (req, res) => {
    res.send('Received a PUT HTTP method');
});

app.delete('/randomvalue', (req, res) => {
    res.send('Received a DELETE HTTP method');
});


//callbacks for express startup
app.listen(port, () => myConsole.log(`Example app listening on port ${process.env.PORT}!`));


//callbacks for data from core program
ipc.on('message', (event, message) => {
    myCconsole.log(message); // logs out "Hello second window!"
    myConsole.log("*** STOPPING NS ***");
    //backgroundServer.close();
})

