var gulp = require('gulp'),
	config = require('../gulp.config')(),
	changed = require('gulp-changed');

gulp.task('copyStatic', function() {
	return gulp.src([config.client + '*.{html,js,map,json,css,woff,ttf,jpg,png,gif,ico}', config.client + '!(jspm_packages)/**/*.{html,js,map,json,css,woff,ttf,jpg,png,gif,ico}'], {base: config.client})
	    .pipe(gulp.dest(config.build_dev.path));
});
gulp.task('copyVendor', function() {
	return gulp.src('client/jspm_packages/**/*.*')
		.pipe(changed(config.build_dev.path+'jspm_packages'))
		.pipe(gulp.dest(config.build_dev.path+'jspm_packages'));
});
gulp.task('static', ['copyStatic', 'copyVendor']);

gulp.task('watch-static', function () {
    gulp.watch([config.client + '*.{html,js,map,json,css,woff,ttf,jpg,png,gif,ico}', config.client + '!(jspm_packages)/**/*.{html,js,map,json,css,woff,ttf,jpg,png,gif,ico}'], ['static']);
});