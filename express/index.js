const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3003;

const scrapping_ikea = require('./scrapping_ikea.js');
const scrapping_image = require('./scrapping_image.js');

app.use(cors());
app.use(bodyParser.json());

app.post('/post_read_data_source', async (req, res) => {
    const body = req.body;
    const source = body.params.source;
    const filePath = path.join(__dirname, './source_' + source + '.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading source_' + source + '.json file:', err);
            return res.status(500).send('Error reading file source_' + source + '.json!');
        } else {
            console.log('File source_' + source + '.json has been read!');
            setTimeout(() => {
                res.status(200).send(data);
            }, 1000);
        }
    });
});

app.post('/post_write_data_source', async (req, res) => {
    const body = req.body;
    const source = body.params.source;
    const data = JSON.stringify(body.params.data);
    const filePath = path.join(__dirname, './source_' + source + '.json');
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing source_' + source + '.json file:', err);
            return res.status(500).send('Error writing file source_' + source + '.json!');
        } else {
            console.log('File source_' + source + '.json has been saved!');
            setTimeout(() => {
                res.status(200).send('File source_' + source + '.json has been saved!');
            }, 1000);
        }
    });
});

app.post('/post_data_url', async (req, res) => {
    try {
        const body = req.body;
        const source = body.params.source;
        const data = JSON.stringify(body.params.data);
        await scrapping_ikea.initialize();
        await scrapping_ikea.scrapping(source, data);
        await scrapping_ikea.formatJson();

        console.log('Script post_data_url executed successfully!');

        const filePath = path.join(__dirname, './data_url.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data_url.json file:', err);
                return res.status(500).send('Error reading file data_url.json!');
            } else {
                console.log('File data_url.json has been read!');
                setTimeout(() => {
                    res.status(200).send(data);
                }, 1000);
            }
        });
    } catch (error) {
        console.error('Error running post_data_url:', error);
        res.status(500).send('Failed to execute post_data_url script!');
    }
});

app.post('/post_data_image', async (req, res) => {
    try {
        const body = req.body;
        const source = body.params.source;
        const data = JSON.stringify(body.params.data);
        await scrapping_image.initialize();
        await scrapping_image.scrapping(source, data);
        await scrapping_image.formatJson();

        console.log('Script post_data_image executed successfully!');

        const filePath = path.join(__dirname, './data_image.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data_image.json file:', err);
                return res.status(500).send('Error reading file data_image.json!');
            } else {
                console.log('File data_image.json has been read!');
                setTimeout(() => {
                    res.status(200).send(data);
                }, 1000);
            }
        });
    } catch (error) {
        console.error('Error running post_data_image:', error);
        res.status(500).send('Failed to execute post_data_image script!');
    }
});

app.get('/get_clean_data_url', async (req, res) => {
    try {
        const filename = path.join(__dirname, './data_url.json');
        fs.writeFileSync(filename, '');
        console.log('Json file data_url.json cleaned!');
        setTimeout(() => {
            res.status(200).send('Json file data_url.json cleaned!');
        }, 1000);
    } catch (error) {
        console.error('Error running get_clean_data_url:', error);
        res.status(500).send('Failed to execute get_clean_data_url!');
    }
});

app.get('/get_clean_data_image', async (req, res) => {
    try {
        const filename = path.join(__dirname, './data_image.json');
        fs.writeFileSync(filename, '');
        console.log('Json file data_image.json cleaned!');
        setTimeout(() => {
            res.status(200).send('Json file data_image.json cleaned!');
        }, 1000);
    } catch (error) {
        console.error('Error running get_clean_data_image:', error);
        res.status(500).send('Failed to execute get_clean_data_image!');
    }
});

app.get('/get_data_url', async (req, res) => {
    const filePath = path.join(__dirname, './data_url.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data_url.json file:', err);
            return res.status(500).send('Error reading file data_url.json!');
        } else {
            setTimeout(() => {
                if (!data || data.trim() === '' || data === 'null' || data === '[]' || data === '{}') {
                    console.log('File data_url.json is empty!');
                    return res.status(200).send('');
                } else {
                    console.log('File data_url.json has been read!');
                    res.status(200).send(data);
                }
            }, 1000);
        }
    });
});

app.get('/get_data_image', async (req, res) => {
    const filePath = path.join(__dirname, './data_image.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data_image.json file:', err);
            return res.status(500).send('Error reading file data_image.json!');
        } else {
            setTimeout(() => {
                if (!data || data.trim() === '' || data === 'null' || data === '[]' || data === '{}') {
                    console.log('File data_image.json is empty!');
                    return res.status(200).send('');
                } else {
                    console.log('File data_image.json has been read!');
                    res.status(200).send(data);
                }
            }, 1000);
        }
    });
});

app.get('/get_data_category', async (req, res) => {
    const filePath = path.join(__dirname, './data_category.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data_category.json file:', err);
            return res.status(500).send('Error reading file data_category.json!');
        } else {
            setTimeout(() => {
                if (!data || data.trim() === '' || data === 'null' || data === '[]' || data === '{}') {
                    console.log('File data_category.json is empty!');
                    return res.status(200).send('');
                } else {
                    console.log('File data_category.json has been read!');
                    res.status(200).send(data);
                }
            }, 1000);
        }
    });
});

app.post('/post_data_category', async (req, res) => {
    const body = req.body;
    const filePath = path.join(__dirname, './data_category.json');
    fs.writeFile(filePath, JSON.stringify(body.params.data), 'utf8', (err) => {
        if (err) {
            console.error('Error writing data_category.json file:', err);
            return res.status(500).send('Error writing file data_category.json!');
        } else {
            console.log('File data_category.json has been saved!');
            setTimeout(() => {
                res.status(200).send('File data_category.json has been saved!');
            }, 1000);
        }
    });
});

app.get('/get_data_subcategory', async (req, res) => {
    const filePath = path.join(__dirname, './data_subcategory.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data_subcategory.json file:', err);
            return res.status(500).send('Error reading file data_subcategory.json!');
        } else {
            setTimeout(() => {
                if (!data || data.trim() === '' || data === 'null' || data === '[]' || data === '{}') {
                    console.log('File data_subcategory.json is empty!');
                    return res.status(200).send('');
                } else {
                    console.log('File data_subcategory.json has been read!');
                    res.status(200).send(data);
                }
            }, 1000);
        }
    });
});

app.post('/post_data_subcategory', async (req, res) => {
    const body = req.body;
    const filePath = path.join(__dirname, './data_subcategory.json');
    fs.writeFile(filePath, JSON.stringify(body.params.data), 'utf8', (err) => {
        if (err) {
            console.error('Error writing data_subcategory.json file:', err);
            return res.status(500).send('Error writing file data_subcategory.json!');
        } else {
            console.log('File data_subcategory.json has been saved!');
            setTimeout(() => {
                res.status(200).send('File data_subcategory.json has been saved!');
            }, 1000);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
