
- [Quick Setup](#quick-setup)
- [Development Evnrionment Setup](#development-evnrionment-setup)
  - [Taiko](#taiko)
- [How to run in Docker Container?](#how-to-run-in-docker-container)
  - [Using Dockerfile](#using-dockerfile)
  - [Using Docker Compose](#using-docker-compose)
- [How to run on different browsers?](#how-to-run-on-different-browsers)
- [How to run on headless or non-headles mode?](#how-to-run-on-headless-or-non-headles-mode)
- [How to run example tests?](#how-to-run-example-tests)
  - [getgauge](#getgauge)
  - [the-internet.herokuapp.com](#the-internetherokuappcom)
- [How to upgrade?](#how-to-upgrade)

# Quick Setup

This is a recommended integration by Taiko.
Gauge is a test runner for writing readable and reusable acceptance tests (might look similar to BDD). Fore more info, refer to
https://docs.taiko.dev/integrating_with_test_runners/#gauge

1. Install Gauge:
    ```
    npm install -g @getgauge/cli
    ```
2. Install Gauge's Bundled Taiko and other dependencies:
    ```
    npm install
    ```
    Note: Recently, there is some compatibiity issue (npm WARN deprecated highlight.js@9.18.5: Support has ended for 9.x series. Upgrade to @latest). In case it fail, you might need to run for 2nd time to complete the installation.

    For Windows, sometimes might fail to extract the downloaded chromium. In this case, you might need to manually extract it:
    ```
    unzip -o node_modules/taiko/.local-chromium/download-win64-724157.zip -d node_modules/taiko/.local-chromium/win64-724157
    ```
3. Optional,you can install these additional plugins:
    ```
    gauge install js
    gauge install html-report
    gauge install screenshot
    ```

4. Finally, you are ready to go! To run the test, run the following command:
    ```
    gauge run specs/example.spec
    ```
    This should run the tests defined in 'specs/example.spec'.

# Development Evnrionment Setup

## Taiko

You definitely need this to try out your code in browser by using Taiko's REPL before writing your codes. This will save a lot of your time in debuging!.

Taiko, is a reliable browser automation tool that aim to reduce flakiness problem that is common in Selenium. It is a free and open source browser automation tool built by the team behind Gauge by ThoughtWorks.


To install, refer to:

https://docs.taiko.dev/#quick-install


You will need to install this in order to try out the taiko script before moving it to step implementations when integrating with Gauge.


# How to run in Docker Container?

**IMPORTANT!** This is essentials for integration with CI/CD pipeline!

For more info, refer to [Taiko In Docker](https://docs.taiko.dev/taiko_in_docker/).

There are two ways:

## Using Dockerfile
By using this approach, the container will be auto destroyed upon completion of test run.

1. Build the docker image tagged as 'gauge-taiko':
   ```
   docker build -t gauge-taiko .
   ```
2. Run the specs in the container by mounting the project directory:
   ```
   docker run  --rm -it -v ${PWD}/reports:/gauge/reports gauge-taiko gauge run specs/example.spec
   ```
## Using Docker Compose

By using this approach, the container will be permanently avaialble to be used until you destroy it.

1. Using Docker Compose to build the docker image and run the container:
   ```
   cd jenkins-slave
   docker-compose build
   docker-compose up -d
   ```
2. Then, docker exec -it to the container and run the test from the project directory:
   ```
   docker exec -it $( docker ps -a -q -f name=taiko-gauge) bash -c "cd /gauge; gauge run specs/example.spec"
   ```

# How to run on different browsers?

1. Download and install browser(s).
2. Set *TAIKO_BROWSER_PATH* to the executable of the browser(s) installed:
   ```
   # Google Chrome  browser
   export TAIKO_BROWSER_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

   # Microsoft Edge browser
   export TAIKO_BROWSER_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
   ```
   *Note: Unfrotunately, there seems to be a problem launching Firefox browser even though the documentation mentioned supporting it.*
3. You can try out by launching a browser using taiko:
   ```
   $ taiko

   Version: 1.0.12 (Chromium:81.0.3994.0)
   Type .api for help and .exit to quit

   > openBrowser()
   [PASS] Browser opened
   > .exit
   ```
4. Now, you may run your test as usual and it should use the browser according to the *TAIKO_BROWSER_PATH* setting.

# How to run on headless or non-headles mode?

To disable/enable headless mode, just set the env variable:
```
export headless_chrome=false
```
and, run the test!

# How to run example tests?

## getgauge

To run an example test:
```
gauge run --env getgauge,default specs/getgauge/ 
```

## the-internet.herokuapp.com

To run tests from specific 'specs' folder:
```
gauge run --env the-internet.herokuapp.com,default specs/herokuapp/
```

To run and skip certain tests by using tag:
```
gauge run --env the-internet.herokuapp.com,default --tags 'herokuapp & !regression' specs/herokuapp/
```

For more info on [Tag Expression](https://docs.gauge.org/execution.html?os=windows&language=javascript&ide=vscode#tag-expressions)


# How to upgrade?

To update gauge, launch Command Prompt as administrator and run the following command:
```
choco install gauge
```

To update plugins, run the following command:
```
gauge update -a
```

To update taiko using npm:taiko --version
```
npm update -g taiko

```
