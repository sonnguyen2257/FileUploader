const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;


const upload = require('./middleware/fileUploader');

app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/upload.html'));
});

app.post('/upload', upload.single('newFile'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded');
});

app.delete('/upload', (req, res) => {
    console.log(req);
    res.end('Delete request received');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
