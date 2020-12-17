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

const wait_time = process.env.wait_time || 100;
const long_wait_time_max = process.env.long_wait_time_max || 100;
const long_wait_time_min = process.env.long_wait_time_min || 100;

step("Navigate to <navigationTab>", async (navigationTab) => {
    assert.ok(await link(navigationTab).exists(), "The '"+navigationTab+"' is not found!"); // REVIEWS I OWN as default page
    await click(navigationTab);
});
