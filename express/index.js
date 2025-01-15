const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const serveIndex = require('serve-index');
const cors = require('cors');
const app = express();

const envFile = path.join(__dirname, '../.env');

fs.readFile(envFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file .env:', err);
        return;
    }

    const envData = {};

    data.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envData[key.trim()] = value.trim();
        }
    });

    const BACKEND_HTTPS = envData.REACT_APP_BACKEND_HTTPS;
    const BACKEND_IP = envData.REACT_APP_BACKEND_IP;
    const BACKEND_PORT = envData.REACT_APP_BACKEND_PORT;
    const SSL_CRT_FILE = envData.SSL_CRT_FILE;
    const SSL_KEY_FILE = envData.SSL_KEY_FILE;

    const options = {
        cert: fs.readFileSync(SSL_CRT_FILE),
        key: fs.readFileSync(SSL_KEY_FILE),
    };

    const get_data_image = require('./get_data_image.js');
    const get_data_website1 = require('./get_data_website1.js');

    app.use(cors());
    app.use(bodyParser.json());

    const imagesPath = path.join(__dirname, '../images');
    app.use(
        '/images',
        express.static(imagesPath),
        serveIndex(imagesPath, { icons: true })
    );

    app.get('/get_data_source', async (req, res) => {
        const filePath = path.join(__dirname, './data_source.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data_source.json file:', err);
                return res.status(500).send('Error reading file data_source.json!');
            } else {
                console.log('File data_source.json has been read!');
                setTimeout(() => {
                    res.status(200).send(data);
                }, 1000);
            }
        });
    });

    app.post('/post_data_source', async (req, res) => {
        const body = req.body;
        const data = JSON.stringify(body.params.data);
        const filePath = path.join(__dirname, './data_source.json');
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) {
                console.error('Error writing data_source.json file:', err);
                return res.status(500).send('Error writing file data_source.json!');
            } else {
                console.log('File data_source.json has been saved!');
                setTimeout(() => {
                    res.status(200).send('File data_source.json has been saved!');
                }, 1000);
            }
        });
    });

    app.post('/post_data_url', async (req, res) => {
        try {
            const body = req.body;
            const source = body.params.source;
            const data = JSON.stringify(body.params.data);
            await get_data_website1.initialize();
            await get_data_website1.getData(source, data);
            await get_data_website1.formatJson();

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
            const data = JSON.stringify(body.params.data);
            await get_data_image.initialize();
            await get_data_image.getData(data);
            await get_data_image.formatJson();

            console.log('Script post_data_image executed successfully!');

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

    app.get('/get_data_website', async (req, res) => {
        const filePath = path.join(__dirname, './data_website.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data_website.json file:', err);
                return res.status(500).send('Error reading file data_website.json!');
            } else {
                setTimeout(() => {
                    if (!data || data.trim() === '' || data === 'null' || data === '[]' || data === '{}') {
                        console.log('File data_website.json is empty!');
                        return res.status(200).send('');
                    } else {
                        console.log('File data_website.json has been read!');
                        res.status(200).send(data);
                    }
                }, 1000);
            }
        });
    });

    app.post('/post_data_website', async (req, res) => {
        const body = req.body;
        const filePath = path.join(__dirname, './data_website.json');
        fs.writeFile(filePath, JSON.stringify(body.params.data), 'utf8', (err) => {
            if (err) {
                console.error('Error writing data_website.json file:', err);
                return res.status(500).send('Error writing file data_website.json!');
            } else {
                console.log('File data_website.json has been saved!');
                setTimeout(() => {
                    res.status(200).send('File data_website.json has been saved!');
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

    if (BACKEND_HTTPS === 'true') {
        https.createServer(options, app).listen(BACKEND_PORT, () => {
            console.log(`API Server is running at https://${BACKEND_IP}:${BACKEND_PORT}`);
        });
    } else {
        app.listen(BACKEND_PORT, () => {
            console.log(`API Server is running at http://${BACKEND_IP}:${BACKEND_PORT}`);
        })
    }
});
