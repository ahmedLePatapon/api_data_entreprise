const puppeteer = require('puppeteer');

const scrappingPJ = async (data) => {
    let telephone;
    const optionPuppeter = {
        headless: false,
        slowMo: 10,
        devtools: true
    };
    const browser = await puppeteer.launch(optionPuppeter);
    const page = await browser.newPage();

    await page.goto(`https://www.pagesjaunes.fr/annuaire/chercherlespros`, { waitUntil: 'domcontentloaded' });

    await page.evaluate(async () => {
        const spans = Array.from(document.querySelectorAll('span'));
        await spans.find(span => spans && span.innerHTML.includes('De quoi avez-vous besoin ?')).click();
    });
    
    await page.waitForSelector('#quoiqui');
    await page.type('#quoiqui', data.denomination);

    await page.waitForSelector('input#ou');
    await page.type('input#ou', `${data.adresse_ligne_1} ${data.code_postal}`);
    await page.waitFor(3000);
    await page.keyboard.press('Enter');


    let el = await page.$('#didomi-popup > div > div > div > span');
    if (el !== null) {
        await page.waitForSelector('#didomi-popup > div > div > div > span')
        await page.click('#didomi-popup > div > div > div > span')
    }
    let p = await page.$('#listResults > ul > li > div > footer > ul > li >span.show-tel');
    if (p !== null) {
        await page.waitForSelector('#listResults > ul > li > div > footer > ul > li > span.show-tel')
        await page.click('#listResults > ul > li > div > footer > ul > li > span.show-tel', {clickCount: 6});
        let phoneResult = await page.$eval('.tel-zone > strong', e => e.innerHTML);
        let phone = phoneResult !== undefined ? phoneResult.split('&nbsp;').join('') : '';
        telephone = phone;
    }
    await browser.close();
    return telephone;
};

module.exports = {
    scrappingPJ
}