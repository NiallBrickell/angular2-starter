var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../gulp.config')();

gulp.task('sass', function () {
    return gulp.src(config.assetsPath.styles + 'main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.build_dev.assetsPath + 'styles/'));
});

gulp.task('watch-sass', function () {
    gulp.watch(config.app + '**/*.scss', ['sass']);
});
