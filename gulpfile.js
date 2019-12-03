const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
 
gulp.task('default', function() {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(ts({
            declaration: true,
            target: 'esnext',
            noImplicitAny: true,
            moduleResolution: 'node',
            allowSyntheticDefaultImports: true
        }));
 
    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});