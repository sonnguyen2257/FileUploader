const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;


const upload = require('./fileUploader');

app.use(express.static(path.join(__dirname, './Views')));

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded');
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, './upload.html'));
});

app.post('/upload', /*upload.single('file'),*/(req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    fs.readdir(path.join(__dirname, './Views'), (err, files) => {
        // create html file to list all the files with href
        

        if (Array.isArray(files)) {
            let html = "<h1>Files</h1>";
            files.forEach((file) => {
                app.get(`/${file}`, (req, res) => {
                    res.sendFile(`${__dirname}/View/${file}`);
                });

                html += `<a href="/${file}">${file}</a><br>`;
            });

            console.log(files);


            res.send(html);

        } else {
            res.redirect('/upload');
        };
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
