const { write,
    click,
    inputField,
    $,
    link,
    highlight,
    evaluate,
    press,
    text,
    button,
    into,
    textBox,
    clear,
    focus,
    dragAndDrop,
    scrollDown,
    below,
    near,
    toLeftOf,
    waitFor,
    reload
} = require('taiko');

const assert = require("assert");

class SecureAreaPage {

    checkPageTitle(pageTitle) {
        return $("//h2[contains(text(),'"+pageTitle+"')]").exists();
    }

}

module.exports = new SecureAreaPage();
