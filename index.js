const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors');   
app.use(cors()); // Enable CORS for all routes  

app.use(cors({
    origin: ['https://invisible-object.netlify.app/','https://copy-phoenix.netlify.app/','http://localhost:3000','https://jayalaxmisilks-bannanje.netlify.app/'] // Only allow requests from this domain
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`'Hello World!'`);
});
