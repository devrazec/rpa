const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3003;

const scrapping_ikea = require('./scrapping_ikea.js');

app.use(cors());
app.use(bodyParser.json());

app.get('/get_source_ikea', async (req, res) => {
    const filePath = path.join(__dirname, './source_ikea.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        } else {
            console.log('File has been read!');
            setTimeout(() => {
                res.status(200).send(data);
            }, 2000);
        }
    });
});

app.post('/post_source_ikea', async (req, res) => {
    const body = req.body;
    const filePath = path.join(__dirname, './source_ikea.json');
    fs.writeFile(filePath, JSON.stringify(body.params.data), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        } else {
            console.log('File has been saved!');
            setTimeout(() => {
                res.status(200).send('File has been saved!');
            }, 2000);
        }
    });
});

app.post('/post_scrapping_ikea', async (req, res) => {
    try {
        const body = req.body;
        const data = JSON.stringify(body.params.data);
        await scrapping_ikea.initialize();
        await scrapping_ikea.scrapping(data);
        console.log('Script executed successfully!');
        res.status(200).send('Script executed successfully!');
    } catch (error) {
        console.error('Error running scrapping_ikea:', error);
        res.status(500).send('Failed to execute scrapping_ikea script!');
    }
});

app.get('/get_format_ikea', async (req, res) => {
    try {
        scrapping_ikea.formatJson();
        console.log('Script executed successfully!');
        setTimeout(() => {
            res.status(200).send('Script executed successfully!');
        }, 2000);
    } catch (error) {
        console.error('Error running format_json_ikea:', error);
        res.status(500).send('Failed to execute format_json_ikea script!');
    }
});

app.get('/get_clean_ikea', async (req, res) => {
    try {
        scrapping_ikea.cleanJson();
        console.log('Script executed successfully!');
        setTimeout(() => {
            res.status(200).send('Script executed successfully!');
        }, 2000);
    } catch (error) {
        console.error('Error running clean_json_ikea:', error);
        res.status(500).send('Failed to execute clean_json_ikea script!');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
