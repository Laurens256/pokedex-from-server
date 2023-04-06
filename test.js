import gulp from 'gulp';
// const ts = require('gulp-typescript');
import ts from 'gulp-typescript';

gulp.task('default', function () {
	return gulp
		.src('public/scripts/**/*.ts')
		.pipe(
			ts({
				noImplicitAny: true,
				outFile: 'testtttt.js'
			})
		)
		.pipe(gulp.dest('public/scripts/min'));
});
