/* globals gauge*/
"use strict";
const { openBrowser,
    write,
    fileField,
    dropDown,
    above,
    attach,
    closeBrowser,
    closeTab,
    scrollDown,
    goto,
    waitFor,
    press,
    screenshot,
    text,
    textBox,
    toRightOf,
    click,
    $,
    into,
    below,
    button,
    highlight,
    evaluate,
    link,
    near,
    clear,
    dragAndDrop,
    toLeftOf,
    hover,
    reload,
    accept,
    screencast,
    confirm,
    focus,
    range } = require('taiko');

const assert = require("assert");
const pageSecureArea = require("./page/admin/secure-area.page");

const wait_time = process.env.wait_time || 100;
const long_wait_time_max = process.env.long_wait_time_max || 100;
const long_wait_time_min = process.env.long_wait_time_min || 100;

const env = 'env/'+process.env.gauge_environment+'/.env';
console.log("env="+env);
require('dotenv').config({ path: env })
const password = process.env.PASS;

step("Validate Page Title <pageTitle>", async (pageTitle) => {
    assert.ok(await pageSecureArea.checkPageTitle(pageTitle), "Page Title:'"+pageTitle+"' not found!");
});

step("Login to Secure Area as <username>", async (username) => {
	await write(username, into(textBox({id: "username"})));
	await write(password, into(textBox({id: "password"})));
    await press('Enter');
});

step("Validate Log In Success", async () => {
    assert.ok(await text('You logged into a secure area!').exists(), "successful message not found!");
    assert.ok(await pageSecureArea.checkPageTitle("Secure Area"), "Page Title:'Secure Area' not found!");
});

step("Validate Log In Failed", async () => {
    assert.ok(await text('Your username is invalid!').exists(), "error message not found!");
});
