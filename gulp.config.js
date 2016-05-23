var historyApiFallback = require('connect-history-api-fallback')

module.exports = function () {
    var root = '';
    var client = root + 'client/';
    var app = client + 'app/';
    var test = root + 'test/';
    var test_js = root + 'test_js/';
    var app_tests = test + 'app/';
    var testHelper = test + 'test-helpers/';
    var e2e = test + 'e2e/';
    var assets = app + 'assets/';
    var assetsPath = {
        styles: assets + 'styles/',
        images: assets + 'images/',
        fonts: assets + 'fonts/'
    };
    var index = root + 'index.html';
    var tsFiles = [
        client + '!(jspm_packages)/**/*.ts'
    ];
    var tsTestFiles = {
        unit: [app_tests + '**/*.spec.ts'],
        e2e: [e2e + '**/*.ts'],
        helper: [testHelper + '**/*.ts']
    };
    var build = {
        path: 'build/',
        app: 'build/app/',
        fonts: 'build/fonts/',
        assetsPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var build_dev = {
        path: 'build_dev/',
        app: 'build_dev/app/',
        fonts: 'build_dev/app/assets/fonts/',
        assetsPath: 'build_dev/app/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var report = {
        path: 'report/'
    };
    var browserSync = {
        dev: {
            port: 3000,
            server: {
                baseDir: build_dev.path,
                middleware: [historyApiFallback()]
            },
            files: [
                build_dev.path + "index.html",
                build_dev.path + "systemjs.conf.js",
                build_dev.assetPath + "styles/main.css",
                build_dev.app + "**/*.js",
                build_dev.app + "**/*.css",
                build_dev.app + "**/*.html"
            ]
        },
        prod: {
            port: 3001,
            server: {
                baseDir: './' + build.path,
                middleware: [historyApiFallback()]
            }
        }
    };

    var e2eConfig = {
        seleniumTarget: 'http://127.0.0.1:3000'
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            mangle: true,
            runtime: false,
            globalDefs: { DEBUG: false, ENV: 'production' }
        }
    };

    var config = {
        root: root,
        client: client,
        app: app,
        test: test,
        test_js: test_js,
        app_tests: app_tests,
        testHelper: testHelper,
        e2e: e2e,
        e2eConfig: e2eConfig,
        assets: assets,
        index: index,
        build: build,
        build_dev: build_dev,
        report: report,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        tsTestFiles: tsTestFiles,
        browserSync: browserSync,
        systemJs: systemJs
    };

    return config;
};
