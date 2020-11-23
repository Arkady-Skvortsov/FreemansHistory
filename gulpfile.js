const  {src, dest, series, watch} = require('gulp')
const gulp = require('gulp')
const del = require('del')
/* Мы подключаем внутренние функции Gulp'a для того, чтобы каждый раз не писать их через ключевое слово */
const newer = require('gulp-newer') //Это очень классный плагин, позволяющий проверять наличие уже оптимизированных файлов(.js || .png)..
const uglify = require('gulp-uglify') //В следующий раз возьму gulp-uglify-es
// import {sass} from 'gulp-sass'; //ES6 formatter from Usually JS... Fuck Node.js 
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const browserify = require('gulp-browserify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const autoprefixer = require( 'gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const sync = require('browser-sync').create()

//All paths (startPaths - what we need for watch and endPaths - where that was modified and minimalizing)
let paths = {
   startPaths: {
      html: ["src/loadScreen.html", "src/singlePlayer.html", "src/finalScreen.html"],
      sass: ["src/sass/loadScreen.scss", "src/sass/singlePlayer.scss", "src/sass/finalScreen.scss", "src/sass/Variables.scss"],
      js: ["src/js/loadScreen.js", "src/js/singlePlayer.js", "src/js/finalScreen.js"],
      images: "src/images/needImages/**/*",
      audio: "src/audio/**/*"
   },
   endPaths: {
      distFolder: 'dist/',
      css: "dist/css",
      js: "dist/js",
      audio: "dist/audio",
      images: "dist/img"
   }
};

//Let's start write a functions)


//work with html 
let html = () => {
    return src(paths.startPaths.html)
           .pipe(htmlmin({
              collapseWhitespace: true,
              removeComments: true
           }))
           .pipe(rename({
              suffix: ".min"
           }))
           .pipe(dest(paths.endPaths.distFolder))
           .pipe(sync.stream());
}

//work with css
let css = () => {
    return src(paths.startPaths.sass)  
         .pipe(sourcemaps.init())
         .pipe(sass())
         .pipe(autoprefixer({
            overrideBrowserslist: [' > 0.1%'] //так будет на много правильнее
         })) 
         .pipe(csso())
         .pipe(rename({suffix: ".min"}))
         .pipe(sourcemaps.write('./'))
         .pipe(dest(paths.endPaths.css))
         .pipe(sync.stream());
}

//work with js
let js = () => {
   return src(paths.startPaths.js)
        .pipe(sourcemaps.init()) 
        .pipe(browserify({
          debug: true
        }))
        .pipe(babel({
           presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(paths.endPaths.js))
        .pipe(sync.stream()) 
}

//work with images
let images = () => {
   return src(paths.startPaths.images)
       .pipe(newer(paths.endPaths.images))
       .pipe(imagemin())
       .pipe(dest(paths.endPaths.images))
}

//audio files
let audio = () => {
	return src(paths.startPaths.audio)
	    .pipe(dest(paths.endPaths.audio))
}

//fonts - @font-face(В следующий раз подключу нормально)

//Clear files.. Это нужно, ведь каждый раз они будут обновляться
let clear = () => {
    return del('dist/**/*')
}

//start serve
let serve = () => {
   sync.init({
      server: {
      	 baseDir: "dist/",
         index: "./loadScreen.min.html"
      },
      notify: false
   })
}


let build = () => { // Production mode 
   return src([
     ["dist/loadScreen.min.html", "dist/singlePlayer.min.html", "dist/finalScreen.min.html"],
     "dist/css/**/*.css",
     "dist/js/**/*.js",
     "dist/img/**/*"
   ], { base: 'dist'}) //Параметр base указывает откуда мы берем эти файлы. Он делает для них структуру папок такой же, какая она и была в указанной папке
   .pipe(dest('dest'))
} //Просто берем и копируем все файлы в другую папку для production


let Watch = () => {
   //И смотрим за файлами вот тут:
   watch("src/**.html", html);
   watch("src/sass/**/*.scss", css);
   watch("src/js/**/*.js", js);
}

exports.default = series(clear, html, audio, images, css, js, gulp.parallel(serve, Watch)); // Develompent mode
exports.Build = build; 

//exports.default = parallel(Watch, serve)





