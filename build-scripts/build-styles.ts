import gulp from 'gulp';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
import { outDir } from './outDir.js';

(() => {
return gulp.src([
    './src/styles/**/*.css',
  ])
    .pipe(concat(`main.css`))
    .pipe(cleanCSS())
    .pipe(autoPrefixer({
      cascade: false
    }))
    .pipe(gulp.dest(outDir))
})();