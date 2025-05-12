const express = require('express');

const serverless = require('serverless-http');
const app = express();
const port = 3000;
const cors = require('cors');   
app.use(cors()); // Enable CORS for all routes  

app.use(cors({
    origin: ['https://invisible-object.netlify.app/','https://copy-phoenix.netlify.app/','http://localhost:3000/','https://jayalaxmisilks-bannanje.netlify.app/'] // Only allow requests from this domain
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define the router
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`'Hello World!'`);
});

app.use('/.netlify/functions/index', router);

// Add this for local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


module.exports.handler = serverless(app);