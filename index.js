const dotenv = require('dotenv')

console.log(new Date().toLocaleString())

dotenv.config()

const puppeteer = require('puppeteer');

// local modules
const { sendNotification, defaultReportTemplate } = require('./modules/helper.functions')

// files
const URLS = require('./files/urls')

const puppeteerOptions = {
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions']
}

const main = async () => {
    const reportArr = []
    // Initializing pupeteer
    const browser = await puppeteer.launch(puppeteerOptions)
    // Instanciating a new page
    const page = await browser.newPage();
    // starting a for loop to work with asyn await
    for ( let i = 0; i < URLS.length; i++) {
        const URL = URLS[i]
        try {
          const pageInfo = await page.goto(URL);
          reportArr.push(defaultReportTemplate(URL, pageInfo.headers().status, pageInfo.headers().status!=='200'))
          if (pageInfo.headers().status!=='200') sendNotification(URL)
        } catch (ex) {
          reportArr.push(defaultReportTemplate(URL, 'Invalid Link', true))
          sendNotification(URL)
        }
    }
    await browser.close();
    
    console.table(reportArr)
}

main()