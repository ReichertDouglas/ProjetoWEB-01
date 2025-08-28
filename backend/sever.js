const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.json());


app.get('/files/:filename', (req, res) => {
    const filePath = getFilePath(req.params.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'File not found.' });
        res.json(JSON.parse(data));
    });
});

app.post('/files/:filename', (req, res) => {
    const filePath = getFilePath(req.params.filename);
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create file.' });
        res.status(201).json({ message: 'File created.' });
    });
});


app.put('/files/:filename', (req, res) => {
    const filePath = getFilePath(req.params.filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) return res.status(404).json({ error: 'File not found.' });
        fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update file.' });
            res.json({ message: 'File updated.' });
        });
    });
});


app.delete('/files/:filename', (req, res) => {
    const filePath = getFilePath(req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(404).json({ error: 'File not found.' });
        res.json({ message: 'File deleted.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});