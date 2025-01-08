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

async function handleHtmlItems(htmlItems, category, subcategory, source) {

    let arrayItems = await htmlItems?.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('.plp-mastercard'), (e, k) => ({
            id: '',
            url: e?.querySelector('.plp-product__image-link').href || '',
            image_url: e?.querySelector('.plp-mastercard__image img').src || '',
            category: '',
            subcategory: '',
            source: ''
        }));
        return elements;
    });

    if (arrayItems) {
        for (let i = 0; i < arrayItems.length; i++) {
            arrayItems[i]['category'] = category;
            arrayItems[i]['subcategory'] = subcategory;
            arrayItems[i]['source'] = source;
        }

        writeJsonFile(arrayItems);
    };
};

async function writeJsonFile(arrayItems) {

    if (arrayItems) {

        const filename = path.join(__dirname, './data_url.json');

        let json = JSON.stringify(arrayItems);

        fs.appendFileSync(filename, json);

        console.log('Updated json file data_url.json!');
    };
};

const scrapping_website2 = {

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

    scrapping: async (source, data) => {

        const array_url = JSON.parse(data);

        console.log('04 - Loading Url from json File: website_source.json');

        for (let i = 0; i < array_url.length; i++) {

            if (array_url[i].enable) {
                await page.goto(array_url[i].url, {
                    timeout: 0,
                    waitUntil: [
                        'load',
                        'domcontentloaded',
                        'networkidle0',
                        'networkidle2'
                    ]
                });
                console.log('05 - Opening the url: ' + array_url[i].url);

                let htmlItems = await page.$('#product-list');
                await handleHtmlItems(htmlItems, array_url[i].category, array_url[i].subcategory, source);
                console.log('06 - Starting Scrapping!');
            }
        }

        // Close Chrome Testing Browser
        await page.close();
        await browser.close();
        console.log('08 - Closing Chrome Browser!');
        console.log('');
    },

    formatJson: async () => {

        const filename = path.join(__dirname, './data_url.json');

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
                console.log('Json file data_url.json format completed!');
            });
        });
    },
};

module.exports = scrapping_website2;