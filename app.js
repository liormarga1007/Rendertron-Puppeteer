const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const browseUrl = 'http://render-tron.appspot.com/';
const ENTER_A_URL_SELECTOR = 'input[type=url]'
const TAKE_SCREENSHOT_SELECTOR = '#options > button:nth-child(1) > i'

var countriesSuffix = [ 
                        /* 'es',
                        'co.il',
                        'com.ar',
                        'cl',
                        'pr',
                        'com.br',
                        'ca',
                        'mx',
                        'co.jp',
                        'hk',
                        'kr',
                        'co.th',
                        'com.au', */
                        'co.nz',
                        'ph',
                        'vn',
                        'co.id',
                        'ch',
                        'in',
                        'ae',
                        'ba',
                        'ua',
                        'le',
                        'be',
                        'by'


                ];

async function rendertronTakeScreenshot() {
    for (let i=0 ; i < countriesSuffix.length; i++){
        for (let j=0; j < devices.length; j++){
            const browser = await puppeteer.launch({
                headless: true,
                gpu: false,
                scrollbars: false,
                args: ['--reduce-security-for-testing', '--deterministic-fetch','--disable-background-networking' ]
            });
        
            const page = await browser.newPage();
        
            await page.emulate(devices[j]);
            console.log('device name: ' + devices[j].name + ' country: '+ countriesSuffix[i]);
            
            await page.goto(browseUrl);
            
            try {
                await page.waitForSelector(ENTER_A_URL_SELECTOR,{timeout:5000});
            } catch (error) {
                console.log(`load enter ${browseUrl} url more than 5 sec`)
                browser.close();
                continue;
            }
            
        
            enterUrlElement = await page.$(ENTER_A_URL_SELECTOR);
        
            const ENTER_A_URL = `https://www.youtube.${countriesSuffix[i]}/watch?v=kaH-nx6owmg`
            await enterUrlElement.type(ENTER_A_URL);
        
            takeScreenshotElement = await page.$(TAKE_SCREENSHOT_SELECTOR);
            await takeScreenshotElement.click();
    
            try {
                await page.waitForSelector('img',{timeout:8000});
                let screenShot = await page.$('img')
                await page.waitFor(3000)
            } catch (error) {
                console.log('load more than 8 sec')
            }
            
            browser.close();
        }
        
    }
    
}
rendertronTakeScreenshot();

module.export= rendertronTakeScreenshot;