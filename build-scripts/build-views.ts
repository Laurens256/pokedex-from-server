import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';

(() => {
	return gulp
		.src('views/**/*.hbs', { base: './' })
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
				minifyJS: true,
				minifyCSS: true,
				ignoreCustomFragments: [/{{[\s\S]*?}}/]
			})
		)
		.pipe(gulp.dest('./dist/'));
})();
