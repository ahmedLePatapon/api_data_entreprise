const puppeteer = require('puppeteer');
var axios = require("axios").default;
const clipboard = require('clipboardy');
const config = require('../config');

const scrappingGoogle = async (data) => {
    let query = `telephone entreprise ${data.denomination} ${data.adresse_ligne_1}`;
    const optionPuppeter = {
        headless: false,
        slowMo: 10,
        devtools: true
    };
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.goto('https://www.google.com/', { waitUntil: 'domcontentloaded' });
    let el = await page.$('#L2AGLb')
    if (el !== null) {
        await page.waitForSelector('#L2AGLb')
        await page.click('#L2AGLb')
    }
    await page.waitForSelector('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input');
    await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input')
    await page.keyboard.type(query);
    await page.keyboard.press('Enter');
    await page.waitFor(3000);

    const phone = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('span'))
        return tds.find(td => td.ariaLabel && td.ariaLabel.includes('Appeler'))?.innerHTML
    });
    await browser.close();
    return phone
};

const infoGoogleSearch = async (data) => {
    let query = `telephone entreprise ${data.denomination} ${data.adresse_ligne_1}`;
    
    var options = {
      method: 'GET',
      url: `https://google-search3.p.rapidapi.com/api/v1/search/q=telephone+allintitle%3A${query}`,
      headers: {
        'x-user-agent': 'desktop',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': config.TOKEN_RAPIDAPI
      }
    };
     
    return axios.request(options).then(function (response) {
        let s = response?.data?.results[0]?.description;
        let o = s.match(/((\+|00)[\,\\,\s\\,\.\\,\-]?33[\,\\,\s\\,\.\\,\-]?|0)\d[\,\\,\s\\,\.\\,\-]?((\d){2}[\,\\,\s\\,\.\\,\-]?){4,5}/g);
        return o
    }).catch(function (error) {
        console.error(error);
        return;
    });
};

const scrappingMaps = async (data) => {
    let queryMaps = `${data.denomination}`;
    const optionPuppeter = {
        headless: false,
        slowMo: 10,
        devtools: true
    };
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.goto('https://www.google.com/maps/', { waitUntil: 'domcontentloaded' });
    let el = await page.$('#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > form > div.lssxud > div > button');
    if (el !== null) {
        await page.waitForSelector('#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > form > div.lssxud > div > button');
        await page.click('#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > form > div.lssxud > div > button');
    }
    
    await page.waitForSelector('#searchboxinput');
    await page.click('#searchboxinput');
    await page.keyboard.type(queryMaps);
    await page.keyboard.press('Enter');
    await page.waitFor(3000);
    
    let phone = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'))
        return btns.find(btn => btn.ariaLabel && btn.ariaLabel.includes('Numéro'))?.ariaLabel.match(/((\+|00)[\,\\,\s\\,\.\\,\-]?33[\,\\,\s\\,\.\\,\-]?|0)\d[\,\\,\s\\,\.\\,\-]?((\d){2}[\,\\,\s\\,\.\\,\-]?){4,5}/g)[0];
    });
    if (phone === undefined) {
        await page.waitForSelector('#searchboxinput');
        await page.click('#searchboxinput');
        await page.keyboard.type(queryMaps + data.adresse_ligne_1 + data.code_postal);
        await page.keyboard.press('Enter');
        await page.waitFor(3000);
        
        phone = await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'))
            return btns.find(btn => btn.ariaLabel && btn.ariaLabel.includes('Numéro'))?.ariaLabel.match(/((\+|00)[\,\\,\s\\,\.\\,\-]?33[\,\\,\s\\,\.\\,\-]?|0)\d[\,\\,\s\\,\.\\,\-]?((\d){2}[\,\\,\s\\,\.\\,\-]?){4,5}/g)[0];
        });
    }
    await browser.close();
    return phone
};

module.exports = {
    scrappingGoogle,
    scrappingMaps,
    infoGoogleSearch
}