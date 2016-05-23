var gulp = require('gulp');
var config = require('../gulp.config')();
var del = require('del');

/* Clean build folder */
gulp.task('clean-build', function () {
    return del([config.build.path]);
});

/* Clean build_dev folder */
gulp.task('clean-build_dev', function () {
    return del([config.build_dev.path+'/!(jspm_packages)']);
});

/* Clean report folder */
gulp.task('clean-report', function () {
    return del([config.report.path]);
});

/* Run all clean tasks */
gulp.task('clean', ['clean-build', 'clean-build_dev', 'clean-report']);