const dotenv = require('dotenv')

console.log(new Date().toLocaleString())

dotenv.config()

const puppeteer = require('puppeteer');

// local modules
const { defaultReportTemplate, sendMail } = require('./modules/helper.functions')

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
        } catch (ex) {
          reportArr.push(defaultReportTemplate(URL, 'Invalid Link', true))
        }
    }
    await browser.close();
    
    console.table(reportArr)

    const email = `
            <div >
                <h3>Broken Link</h3>
                <br/>
                <p>
                    The following link appears broken, please check.
                    <br /><br />
                    ${
                        reportArr
                        .map(report => report.broken ? `<a href="${report.url}" target="_blank">${report.url}</a><br /><br />` : '')
                        .join('')
                    }
                    Thanking You!
                </p>
            </div>
            `

    sendMail(process.env.TO_EMAIL, email)
}

main()