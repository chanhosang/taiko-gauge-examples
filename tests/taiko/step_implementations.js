// const asscreencastsert = require('taiko-screencast');
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


// (async () => {
step("Demo Video Recording", async () => {
        try {
            // https://github.com/getgauge-contrib/taiko-screencast
            await screencast.startScreencast('videos/output.gif');
            await goto('gauge.org');
            await click('Plugins');
        } finally {
            await screencast.stopScreencast();
        }

        // await click('Plugins');
})



step("Demo JavaScript Function", async () => {


    var result = false;
    for (var i = 0; i < 5; i++) {
        result = false;
        console.log("Drag item...");
        if(result){
            console.log("DRAG SUCCESS!!")
        }

        break;
    }

    assert.ok(result);

})

step("Goto getgauge github page", async () => {
    await goto('https://github.com/getgauge');
});

step("Search for <query>", async (query) => {
    await focus(textBox(toRightOf('Pricing')))
    await write(query);
    await press('Enter');
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(content).exists());
});



