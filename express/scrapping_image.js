const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const pluginAdblocker = require('puppeteer-extra-plugin-adblocker');
const pluginAnonymize = require('puppeteer-extra-plugin-anonymize-ua');
const pluginPreferences = require('puppeteer-extra-plugin-user-preferences');
const fs = require('node:fs');
const path = require('path');
const setTimeout = require('node:timers/promises');
const exec = require('node:child_process');

let browser = null;
let page = null;

async function handleJsonField(filename, category, subcategory, source) {

    let arrayItem = [
        {
            id: '',
            filename: filename,           
            category: category,
            subcategory: subcategory,
            source: source
        }
    ]

    console.log('Created json array!');

    writeJsonFile(arrayItem);
};

async function writeJsonFile(arrayItems) {

    if (arrayItems) {

        const filename = path.join(__dirname, './data_image.json');

        let json = JSON.stringify(arrayItems);

        fs.appendFileSync(filename, json);

        console.log('Updated json file data_image.json!');
    };
};

const scrapping_image = {

    initialize: async () => {

        console.log('');
        console.log('## Initializing Puppeteer ##');

        puppeteer.use(pluginAdblocker({
            blockTrackers: true
        }));

        puppeteer.use(pluginStealth());

        puppeteer.use(pluginAnonymize());

        puppeteer.use(pluginPreferences({
            userPrefs: {
                webkit: {
                    webprefs: {
                        default_font_size: 16
                    }
                }
            }
        }));
        console.log('01 - Starting Puppeteer Plugins!');

        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--start-maximized',
                //'--incognito',
                //'--mute-audio',
                //'--no-sandbox',
                //'--disable-dev-shm-usage',
                //'--disable-accelerated-2d-canvas',
                //'--disable-2d-canvas-clip-aa',
                //'--disable-setuid-sandbox',
                //'--no-first-run',
                //'--no-zygote',
                //'--disable-notifications',
                //'--disable-gpu',
                //'--disable-popup-blocking',
                '--window-size=800,540'
            ]
        });
        console.log('02 - Setting Chrome Browser!');

        page = await browser.newPage();
        page.setDefaultTimeout(0);
        page.setDefaultNavigationTimeout(0);
        console.log('03 - Creating a Browser Context!');
    },

    scrapping: async (data) => {

        const array_url = JSON.parse(data);

        console.log('04 - Loading Url from json File: data_url.json');

        page.on('response', async (response) => {

            const url = response.url();

            console.log('Processing URL:', url);

            const matches = /.*\.(jpg|png|svg|gif)(\?.*)?$/.exec(url);

            if (matches) {

                const extension = matches[1];

                const buffer = await response.buffer();

                const matchedItem = array_url.find(item => url.includes(item.image_url));

                if (matchedItem) {

                    const { category, subcategory } = matchedItem;
                    const folderPath = `images/${category}/${subcategory}`;

                    // Ensure folders exist
                    if (!fs.existsSync(folderPath)) {
                        fs.mkdirSync(folderPath, { recursive: true });
                    }

                    // Get the number of existing files in the folder
                    const files = fs.readdirSync(folderPath);
                    const nextNumber = files.length + 1;
                    const filename = `${nextNumber}.${extension}`;
                    const filePath = path.join(folderPath, filename);

                    try {

                        fs.writeFileSync(filePath, buffer);
                        console.log('06 - Downloading the image!');


                        await handleJsonField(filename, matchedItem.category, matchedItem.subcategory, matchedItem.source);

                        console.log(`Image saved: ${filePath}`);

                    } catch (error) {
                        console.error(`Failed to save image from URL: ${url}`, error);
                    }
                }
            };
        });

        for (let i = 0; i < array_url.length; i++) {

            await page.goto(array_url[i].image_url, {
                timeout: 0,
                waitUntil: [
                    'load',
                    'domcontentloaded',
                    'networkidle0',
                    'networkidle2'
                ]
            });
            console.log('05 - Opening the url: ' + array_url[i].image_url);
        }

        // Close Chrome Testing Browser
        await page.close();
        await browser.close();
        console.log('08 - Closing Chrome Browser!');
        console.log('');
    },

    formatJson: async () => {

        const filename = path.join(__dirname, './data_image.json');

        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }

            // Replace "][" with ","
            const modifiedData = data.replace(/\]\[/g, ',');

            const json_parse = JSON.parse(modifiedData);

            for (let i = 0; i < json_parse.length; i++) {
                json_parse[i].id = i + 1;
            }

            fs.writeFileSync(filename, JSON.stringify(json_parse), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing the file: ', err);
                    return;
                }
                console.log('Json file data_image.json format completed!');
            });
        });
    },

    cleanJson: async () => {

        const filename = path.join(__dirname, './data_image.json');

        fs.writeFileSync(filename, '');

        console.log('Json file data_image.json cleaned!');
    }
};

module.exports = scrapping_image;