import gulp from 'gulp';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';
import { outDir } from './outDir.js';

const clientSideTs = ts.createProject('src/scripts/tsconfig.json');

// Client side typescript
(() => {
	return gulp
		.src('src/scripts/**/*.ts', { base: './src' })
		.pipe(clientSideTs())
		.pipe(uglify())
		.pipe(gulp.dest(outDir));
})();

// service worker
(() => {
	return gulp.src('src/scripts/**/*.js').pipe(uglify()).pipe(gulp.dest(outDir));
})();


