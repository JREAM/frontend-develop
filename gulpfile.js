// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp            = require("gulp"),
    fs              = require('fs'),
    yaml            = require('js-yaml'),
    sass            = require("gulp-sass"),
    concat          = require("gulp-concat"),
    watch           = require("gulp-watch"),
    plumber         = require("gulp-plumber"),
    minify_css      = require("gulp-minify-css"),
    uglify          = require("gulp-uglify"),
    sourcemaps      = require("gulp-sourcemaps"),
    notify          = require("gulp-notify"),
    imagemin        = require("gulp-imagemin"),
    jshint          = require("gulp-jshint"),
    gutil           = require("gulp-util"),
    postcss         = require("gulp-postcss"),
    autoprefixer    = require("autoprefixer"),
    pngquant        = require("imagemin-pngquant"),
    browserSync     = require("browser-sync"),
    watchify        = require('watchify');

// --------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------

var config = yaml.load(fs.readFileSync('config.yml', 'utf-8'));

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------
var onError = function(err) {
    console.log(err);
    this.emit('end');
};

// --------------------------------------------------------------------
// Task: Sass
// --------------------------------------------------------------------
gulp.task('sass', function() {

    return gulp.src([config.src.sass])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(concat(config.dist.css))
        .pipe(gulp.dest(config.dist.path_css))
        .pipe(minify_css())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dist.path_css))
        .pipe(browserSync.reload({stream: true}));
});


// --------------------------------------------------------------------
// Task: JS
// --------------------------------------------------------------------
gulp.task('js', function() {

    return gulp.src(config.src.js)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat(config.dist.js))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dist.path_js))
        .pipe(browserSync.reload({stream: true}));

});


// --------------------------------------------------------------------
// Task: Image
// --------------------------------------------------------------------

gulp.task('img', function() {

    return gulp.src(config.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.dist.path_img));

});


// --------------------------------------------------------------------
// Task: Third Party
// --------------------------------------------------------------------

gulp.task('third_party', function () {

    // These are already minified
    gulp.src(config.third_party.css)
        .pipe(concat(config.dist.css_dependency))
        .pipe(gulp.dest(config.dist.path_css));

    // These are already minified
    gulp.src(config.third_party.js)
        .pipe(concat(config.dist.js_dependency))
        .pipe(gulp.dest(config.dist.path_js));

    // Copy any map files
    gulp.src(config.third_party.js_map)
        .pipe(gulp.dest(config.dist.path_js));

    // These are plain files
    gulp.src(config.third_party.fonts)
        .pipe(gulp.dest(config.dist.path_fonts));

});


// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function() {
    gutil.log(gutil.colors.green('Loading Gulp Watch'), '');
    browserSync.init({
        proxy: config.browser_proxy,
    });
    gulp.watch(config.src.js, ['js']);
    gulp.watch(config.src.sass, ['sass']);
    gulp.watch(config.src.img, ['img']);
    gulp.watch(config.template_files).on('change', browserSync.reload);
});


// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', [
    'img',
    'js',
    'sass',
    'third_party',
]);
