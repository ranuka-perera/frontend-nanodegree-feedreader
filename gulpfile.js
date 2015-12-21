var gulp = require('gulp'),
    upload_gh = require('gulp-gh-pages');

// Deploy to github gh-pages branch.
gulp.task('deploy', function () {
    return gulp.src(['index.html', 'css/**/*', 'fonts/**/*', 'jasmine/**/*', 'js/**/*'], {base: './'})
        .pipe(upload_gh());
});