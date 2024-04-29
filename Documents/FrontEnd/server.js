const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'FRONTEND')));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FRONTEND', 'index.html'));
});

const PORT = 2183; // Set the port number to 2183
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
