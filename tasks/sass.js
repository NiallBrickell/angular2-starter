var gulp = require('gulp'),
	sass = require('gulp-sass'),
	config = require('../gulp.config')(),
	sassJspm = require('sass-jspm-importer');

gulp.task('sass', function () {
    return gulp.src(config.assetsPath.styles + 'main.scss')
        .pipe(sass({
        	functions: sassJspm.resolve_function(config.build_dev + 'jspm_packages/'),
        	importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.build_dev.assetsPath + 'styles/'));
});

gulp.task('watch-sass', function () {
    gulp.watch(config.app + '**/*.scss', ['sass']);
});
