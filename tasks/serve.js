var gulp = require('gulp');
var config = require('../gulp.config')();
var bs = require("browser-sync");
var runSequence = require('run-sequence');

function startBrowsersync(config) {
    bsIns = bs.create();
    bsIns.init(config);
    bsIns.reload();
}

gulp.task('browserSync', function() {
	startBrowsersync(config.browserSync.dev);
});

/* Start live server dev mode */
gulp.task('serve-dev', function(cb) {
	runSequence('clean', ['static', 'sass', 'tsc-app', 'watch-static', 'watch-ts', 'watch-sass'], 'browserSync', cb);
});

/* Start live server production mode */
gulp.task('serve-build', ['build'], function () {
    startBrowsersync(config.browserSync.prod);
});