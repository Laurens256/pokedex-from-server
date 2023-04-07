import gulp from 'gulp';
import ts from 'gulp-typescript';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

const tsProject = ts.createProject('src/scripts/tsconfig.json');

(() => {
	return gulp
		.src('src/scripts/**/*.ts')
		.pipe(tsProject())
		.pipe(uglify())
		// .pipe(concat('index.js'))
		.pipe(gulp.dest('./public/'));
})();
