const path = require('path');
const yargs = require('yargs').argv;
const reporter = require('cucumber-html-reporter');
const cucumberJunitConvert = require('cucumber-junit-convert');

const reportOptions = {
    theme: 'bootstrap',
    jsonFile: path.join(__dirname, '../reports/report.json'),
    output: path.join(__dirname, '../reports/cucumber-report.html'),
    reportSuitsAsScenarios: true
};

const options = {
    inputJsonFile: path.join(__dirname, '../reports/report.json'),
    outputXmlFile: path.join(__dirname, '../reports/junit-report.xml')
};

exports.config = {
    allScriptsTimeout: 6000,
    getPageTimeout: 6000,
    specs: [path.resolve('./test/features/*.feature')],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        shardTestFiles: yargs.instances > 1,
        maxInstances: yargs.instances || 1,
        browserName: 'chrome',
        chromeOptions: {
            args: ['--no-sandbox', '--start-maximized']
        },
    },
    disableChecks: true,
    directConnect: true,
    cucumberOpts: {
        require: ['../step_definitions/**/*.js'],
        //ignoreUncaughtExceptions: true,
        format: ['json:../reports/report.json'],
        tags: yargs.tags || '@smoke'
    },
    onPrepare: () => {
        return browser.waitForAngularEnabled(false);
      },
    afterLaunch: () => {
        return [reporter.generate(reportOptions),
            cucumberJunitConvert.convert(options)];
    }
};
