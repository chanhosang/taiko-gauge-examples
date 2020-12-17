/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, screenshot, text, focus, textBox, toRightOf, waitFor, confirm, link, click, accept } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';


beforeSuite(async () => {
    // await openBrowser({ headless: headless })
    // await openBrowser({headless: headless, args: ["--start-fullscreen"]})
    // await openBrowser({headless: headless, args: ["--window-size=1440,900"]})
    // For docker container
    // await openBrowser({headless: headless, args: ['--window-size=1920,1080', '--disable-gpu','--disable-dev-shm-usage','--disable-setuid-sandbox','--no-first-run','--no-sandbox','--no-zygote']})
    await openBrowser({headless: headless, args: ['--start-maximized', '--disable-gpu','--disable-dev-shm-usage','--disable-setuid-sandbox','--no-first-run','--no-sandbox','--no-zygote']})


    console.log("URL:"+process.env.base_url);
    const base_url = process.env.base_url ;
    await goto(base_url, {navigationTimeout: 60000});

});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

