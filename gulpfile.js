// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp            = require("gulp"),
    fs              = require('fs'),
    yaml            = require('js-yaml'),
    babel           = require("gulp-babel")
    sass            = require("gulp-sass"),
    concat          = require("gulp-concat"),
    watch           = require("gulp-watch"),
    plumber         = require("gulp-plumber"),
    cssnano         = require("gulp-cssnano"),
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
    watchify        = require('watchify'),
    config          = null;

// --------------------------------------------------------------------
// Settings
// --------------------------------------------------------------------
if (fs.existsSync('../config-gulp.yml')) {
    config = yaml.load(fs.readFileSync('../config-gulp.yml', 'utf-8'));
} else if (fs.existsSync('config-gulp.yml')) {
    config = yaml.load(fs.readFileSync('config-gulp.yml', 'utf-8'));
} else {
   gutil.log(gutil.colors.bgRed("Error: config-gulp.yml not found in . or ../"));
   gutil.log("Please view the README.md to setup.");
   process.exit(1);
}

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------
var onError = function(error) {
    gutil.log(gutil.colors.red(error));
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
        .pipe(cssnano())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
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
        .pipe(babel())
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

    // Copy any font files
    gulp.src(config.third_party.fonts)
        .pipe(gulp.dest(config.dist.path_fonts));

    // Copy move only files
    gulp.src(config.third_party_move_only.css)
        .pipe(gulp.dest(config.dist.path_third_party_css));

    gulp.src(config.third_party_move_only.js)
        .pipe(gulp.dest(config.dist.path_third_party_js));
});

// --------------------------------------------------------------------
// Move Files to another desired path,
// This will prevent git submodule changes for updates
// --------------------------------------------------------------------
gulp.task('move', function() {
    gutil.log(gutil.colors.red('This is not implemented yet.'));
    return false;

    gulp.src(config.dist, { base: './' })
        .pipe(gulp.dest('variable_path_here'));
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
