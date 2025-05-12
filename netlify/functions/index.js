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

router.get("/get-ip", (req, res) => {
  try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        res.json({ ip: ip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve IP address' });
    }
});

app.use('/.netlify/functions/index', router);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ error: 'Something went wrong!' });
});

// Add this for local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}


module.exports.handler = serverless(app);