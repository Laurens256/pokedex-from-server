import gulp from 'gulp';
import { outDir } from './outDir.js';

(() => {
	return gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest(outDir));
})();
