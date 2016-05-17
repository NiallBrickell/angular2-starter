var gulp = require('gulp');
var config = require('../gulp.config')();

//Required JS, maps and CSS
var require = [
	"./node_modules/zone.js/dist/zone.js*",
	"./node_modules/reflect-metadata/Reflect.js*",
	"./node_modules/es6-shim/es6-shim.min.js*",
	"./node_modules/systemjs/dist/system.js*",
	"./node_modules/font-awesome/css/font-awesome.css"
];
//***TODO***// Build bundle etc in build dir so we can deploy fast with the same process

gulp.task('copyStatic', function() {
	return gulp.src([config.app + '**/*.html', config.app + '**/*.js', config.assetsPath.fonts + '**/*.*', config.assetsPath.images + '**/*.*'], {base: config.app})
	    .pipe(gulp.dest(config.build_dev.path));
});
gulp.task('copyVendor', function() {
	return gulp.src(require, {base: './node_modules'})
	    .pipe(gulp.dest(config.build_dev.app+"vendor/"));
});
gulp.task('static', ['copyStatic', 'copyVendor']);

gulp.task('watch-static', function () {
    gulp.watch([config.app + '*.*', config.assetsPath.fonts + '**/*.*', config.assetsPath.images + '**/*.*'], ['static']);
});