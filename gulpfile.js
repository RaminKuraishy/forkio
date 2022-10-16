import gulp from 'gulp';
import prefix from 'gulp-autoprefixer';
import fileinclude from 'gulp-file-include';
import clean from 'gulp-clean';
import minCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import imgMin from 'gulp-imagemin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sync, { watch } from 'browser-sync';
import uglify from 'gulp-uglify'
const sass = gulpSass(dartSass);
export const dev = () => {
        sync.init({
          server: { baseDir: "./" },
        });
        watch("./src/style/**/*.scss", gulp.series(css)).on("change", sync.reload);
        watch("./src/js/**/*.js", gulp.series(jsMin)).on("change", sync.reload);
        watch("./**/*.html", gulp.series(html)).on("change", sync.reload);
};
export const cleanAll = () => {
    return gulp.src('dist')
    .pipe(clean())
};
export const html = () => {
    return src('./**/*.html', {})
		.pipe(fileinclude())
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(dest('./dist'))
		.pipe(sync.stream());
}
export const css = () => {
    return gulp.src('./src/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(minCss())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/style/'))
};
export const imageMin = () => {
return gulp.src('src/image/*')
.pipe(imgMin())
.pipe(gulp.dest('./dist/images'))
};
export const jsMin = () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.min.js'))
   .pipe(gulp.dest('./dist/js'))

};
export const cssNormalize = () => {
    return gulp.src('./src/style/normalize.css')
    .pipe(gulp.dest('./dist/style/'))
};

export const build = gulp.series(cleanAll, css, jsMin, imageMin);