var
    gulp        = require("gulp"),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload
;

// 静态服务器
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 5555,
        notify: false,
        startPath: "src/index.html?token=2c7a6f3984d6d9fd16eca02f7d73c661&pid=1001#/didiIndex" // 默认打开根目录后面跟的文件名配置
    });
    gulp.watch("src/webpack_build/build.js").on('change', reload); // 监听控制器文件变动 刷新浏览器
    gulp.watch("src/template/**/*.html").on('change', reload); // 监听控制器文件变动 刷新浏览器
});