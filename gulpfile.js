// ====== require ======

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var uglify      = require('gulp-uglify');
var cssnext     = require("gulp-cssnext");
var concat      = require("gulp-concat");
var inject      = require("gulp-inject");
var sourcemaps  = require("gulp-sourcemaps");
var runSequence = require("run-sequence");
var del         = require('del');
var rename      = require("gulp-rename");
var ftp         = require( 'vinyl-ftp' );

var browserify  = require("browserify");
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var gutil       = require('gulp-util');
var chalk       = require('chalk');


// ====== require ======

var conf = require('./gulpfileConfig');


// ====== function ======

function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message))
    }

    this.emit('end');
}


// ====== tasks ======

gulp.task('inject', function() {
    if(conf.env == 'dev'){
        var src = gulp.src(['./' + conf.target + '/vendor/*.js', './' + conf.target + '/**/*.js', './' + conf.target + '/**/*.css'], {read: false});
    } else {
        var src = gulp.src(['./' + conf.target + '/**/phaser*.js', './' + conf.target + '/**/*.js', './' + conf.target + '/**/*.css'], {read: false});
    }
    return gulp.src('./' + conf.target + '/index.html')
        .pipe(inject(src, {relative: true}))
        .pipe(gulp.dest('./' + conf.target));
});

gulp.task('htmls', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./' + conf.target + '/'))
});

gulp.task('maps', function() {
    return gulp.src('./src/maps/**/*')
        .pipe(gulp.dest('./' + conf.target + '/map/'))
});

gulp.task('sounds', function() {
    return gulp.src('./src/sound/**/*')
        .pipe(gulp.dest('./' + conf.target + '/sound/'))
});

gulp.task('images', function() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./' + conf.target + '/img/'))
});

gulp.task('styles', function() {
    return gulp.src('./src/css/*.css')
        .pipe(concat('global.min.css'))
        .pipe(cssnext({ compress: conf.env == 'dev' ? false : true }))
        .pipe(gulp.dest('./' + conf.target + '/css/'))
});

gulp.task('babelify', function () {
    var bundler = browserify({
        entries: 'src/js/app.js',
        debug: true
    });
    bundler.transform(babelify.configure({
        presets : ["es2015"]
    }));

    var task = bundler.bundle()
        .on('error', map_error)
        .pipe(source('app.js'))
        .pipe(buffer());

    if(conf.env == 'dev'){
        task.pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./' + conf.target + '/js'));

    } else {
        task.pipe(rename(Date.now() + '.js'))

        if(conf.debug){
            task.pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./' + conf.target + '/js'));
        } else {
            task.pipe(uglify())
                .pipe(gulp.dest('./' + conf.target + '/js'));
        }
    }

    return task;
});

gulp.task('vendor', function () {
    if (conf.env == 'dev') {
        var src =  gulp.src(['./node_modules/phaser/build/phaser.js','./node_modules/phaser/build/phaser.map']);
        var dest = gulp.dest('./' + conf.target + '/vendor/');
    } else {
        var src =  gulp.src(['./node_modules/phaser/build/phaser.min.js']);
        var dest = gulp.dest('./' + conf.target + '/js');
    }
    return  src.pipe(dest);
});

gulp.task('clean', function(){
    return del('./' + conf.target);
});

gulp.task('build', function(callback){
    runSequence('clean', 'vendor', 'babelify', 'styles', 'images', 'sounds', 'maps', 'htmls', 'inject', callback);
});


// ====== dist ======

gulp.task('server-start', function(callback){
    runSequence('build', function(){
        browserSync.init({
            server: { baseDir: "./" + conf.target + "/" },
            open: false
        });
        callback();
    });
})

gulp.task('server-reload', function(callback){
    browserSync.reload();
    callback();
})

gulp.task('server', ['server-start'], function() {
    gulp.watch('./src/**/*.js', function() {
        runSequence('babelify', 'inject', 'server-reload');
    });
    gulp.watch('./src/**/*.css', function() {
        runSequence('styles', 'inject', 'server-reload');
    });
    gulp.watch('./src/maps/**/*', function() {
        runSequence('maps', 'server-reload');
    });
    gulp.watch('./src/img/**/*', function() {
        runSequence('images', 'server-reload');
    });
});


// ====== prod ======

gulp.task('prod-conf', function() {
    conf.debug  = false;
    conf.env    = 'prod';
    conf.target = conf.env == 'dev'? 'dist': 'build';
});

gulp.task('prod-conf-debug', function() {
    conf.debug  = true;
    conf.env    = 'prod';
    conf.target = conf.env == 'dev'? 'dist': 'build';
});

gulp.task('build-prod', ['prod-conf', 'build'], function(){});

gulp.task('server-prod', ['prod-conf', 'server-start'], function(){});

gulp.task('server-prod-debug', ['prod-conf-debug', 'server-start'], function(){});

gulp.task('deploy', ['build-prod'], function() {
    var conn = ftp.create({
        host:     conf.host,
        user:     conf.user,
        password: conf.password,
        parallel: 10,
    });

    return gulp.src('./' + conf.target + '/**/*')
        .pipe(conn.dest('/www/mario/'));
});
