module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['build/tests.js'],
    reporters: ['progress'],
    singleRun: true,

    browserStack: {
      username: 'johan@holmer.in'
    },
    customLaunchers: {
      bs_ie9: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '9',
        os: 'windows',
        os_version: '7'
      },
      bs_safari8: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '8',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_chrome_stable: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '69',
        os: 'windows',
        os_version: '10'
      },
      bs_firefox_stable: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '62',
        os: 'windows',
        os_version: '10'
      },
      bs_safari_stable: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '12',
        os: 'OS X',
        os_version: 'Mojave'
      },
      bs_edge_stable: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: '17',
        os: 'windows',
        os_version: '10'
      }
    },
    browsers: [
      'bs_safari8',
      'bs_ie9',
      'bs_chrome_stable',
      'bs_firefox_stable',
      'bs_safari_stable',
      'bs_edge_stable',
    ]
  });
}
