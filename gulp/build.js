'use strict';

var gulp = require('gulp');
var config = require('./config')();
var gulpSequence = require('gulp-sequence');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

gulp.task('partials', function() {
    return gulp.src(config.templatecache.files)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: config.templatecache.moduleName
        }))
        .pipe(gulp.dest(config.templatecache.dest));
});

gulp.task('html', ['inject', 'partials'], function() {
    var partialsInjectFile = gulp.src(config.templatecache.dest + '/*.js', {
        read: false
    });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: config.templatecache.dest,
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', {
        restore: true
    });
    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });
    var assets;

    return gulp.src(config.serve + '/*.html')
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        }))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.replace('../bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(config.dist))
        .pipe($.size({
            title: config.dist,
            showFiles: true
        }));
});

gulp.task('images', function() {
    return gulp.src(config.images.files)
        .pipe(gulp.dest(config.images.dest));
});

gulp.task('fonts', function() {
    return gulp.src(config.fonts.files)
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('misc', function() {
    return gulp.src(config.misc.files)
        .pipe(gulp.dest(config.dist));
});

gulp.task('clean', function() {
    return gulp.src([config.dist, config.tmp])
        .pipe($.clean({
            force: true
        }));
});

gulp.task('build', gulpSequence('clean', ['images', 'misc', 'fonts'], 'html'));