var gulp = require('gulp');
var config = require('../gulp.config')();
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');

/* Initialize TS Project */
var typingFiles = [
    'typings/index.d.ts'
];
var tsUnitFiles = [].concat(config.tsTestFiles.unit, config.tsTestFiles.helper);
var tsE2EFiles = [].concat(config.tsTestFiles.e2e, config.tsTestFiles.helper);
var tsFiles = [].concat(config.tsFiles, tsUnitFiles, tsE2EFiles);

/* Watch changed typescripts file and compile it */
gulp.task('watch-ts', function () {
    return gulp.watch(tsFiles, function (file) {
        console.log('Compiling ' + file.path + '...');
        return compileTs(file.path, true);
    });
});

/* Compile typescripts */
gulp.task('tsc', function () {
	compileAppTs(tsFiles);
	return compileTestTs(tsFiles);
});

gulp.task('tsc-app', function () {
    return compileAppTs(config.tsFiles);
});

gulp.task('tsc-unit', function () {
    return compileTestTs(tsUnitFiles);
});

gulp.task('tsc-e2e', function () {
    return compileTestTs(tsE2EFiles);
});

/* Lint typescripts */
gulp.task('tslint', function () {
    return lintTs(tsFiles);
});

gulp.task('tslint-app', function () {
    return lintTs(config.tsFiles);
});

gulp.task('tslint-unit', function () {
    return lintTs(tsUnitFiles);
});

gulp.task('tslint-e2e', function () {
    return lintTs(tsE2EFiles);
});

function lintTs(files) {
    return gulp.src(files)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
          summarizeFailureOutput: true
        }));
}

function compileAppTs(files, watchMode) {
    watchMode = watchMode || false;
    var tsProject = ts.createProject(config.root + 'tsconfig.json');
    var allFiles = [].concat(files, typingFiles);
    var res = gulp.src(allFiles, {
            base: config.client,
            outDir: config.build_dev.path
        })
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            summarizeFailureOutput: true,
            emitError: !watchMode
        }))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .on('error', function () {
            // process.exit(1);
            console.warn('Error occured... waiting for changes');
        });
    return res.js
        .pipe(sourcemaps.write('.', {
              includeContent: false
            }))
        .pipe(gulp.dest(config.build_dev.path));
}
function compileTestTs(files, watchMode) {
    watchMode = watchMode || false;
    var tsProject = ts.createProject(config.root + 'tsconfig.json');
    var allFiles = [].concat(files, typingFiles);
    var res = gulp.src(allFiles, {
            base: config.test,
            outDir: config.test_js
        })
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            summarizeFailureOutput: true,
            emitError: !watchMode
        }))
        // .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .on('error', function () {
            console.warn('Error occured... waiting for changes');
        });
    return res.js
        .pipe(sourcemaps.write('.', {
              includeContent: false
            }))
        .pipe(gulp.dest(config.test_js));
}