const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const entry = "./src/server/**/*.js";

//开发环境
function builddev() {
    return watch(entry, {
        ignoreInitial: false
    }, function () {
        gulp.src(entry)
            .pipe(babel({
                babelrc: false, //让外面的babelrc不生效
                "plugins": [
                    ["transform-es2015-modules-commonjs"]
                ]
            }))
            .pipe(gulp.dest('dist'));
    })
}
//上线环境
function buildprod() {
    return gulp.src(entry)
        .pipe(babel({
            babelrc: false, //让外面的babelrc不生效
            ignore: ["./src/server/config/*.js"],
            "plugins": [
                ["transform-es2015-modules-commonjs"]
            ]
        }))
        .pipe(gulp.dest('dist'));
}
//代码检查环境
function buildlint() {

}
//代码清洗环境
function buildconfig() {
    return gulp.src(entry)
        .pipe(rollup({
            output: {
                format: "cjs"
            },
            input: './src/server/config/index.js',
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}

let build = gulp.series(builddev);

if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildprod, buildconfig);
}

if (process.env.NODE_ENV == 'lint') {
    build = gulp.series(buildlint);
}

if (process.env.NODE_ENV == 'lint') {
    build = gulp.series(buildlint);
}

gulp.task("default", build);