"use strict";

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
const jsdoc = require("gulp-jsdoc3");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function (cb) {
  return gulp
    .src("./css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("sass:watch", function () {
  gulp.watch("./css/*.scss", gulp.series(["sass"]));
});

const eslint = require("gulp-eslint");

gulp.task("eslint", function () {
  return gulp
    .src(["./node_modules/eslint/package.json", "./js/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("jsdoc", function (cb) {
  const config = require("./node_modules/jsdoc/jsdoc.js");
  gulp.src(["./js/*.js"], { read: false }).pipe(jsdoc(config, cb));
});

gulp.task(
  "serve",
  gulp.series(["sass"], function () {
    browserSync.init({
      server: "./",
    });

    gulp.watch("./css/*.scss", gulp.series(["sass"]));
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/*.js").on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series(["serve"]));
