import gulp from 'gulp';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';

const tsProject = ts.createProject('src/scripts/tsconfig.json');

(() => {
	return gulp
		.src('src/scripts/**/*.ts')
		.pipe(tsProject())
		.pipe(uglify())
		.pipe(gulp.dest('./public/'));
})();

(() => {
	return gulp.src('src/scripts/**/*.js').pipe(uglify()).pipe(gulp.dest('./public/'));
})();
