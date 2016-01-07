# Frontend-Develop

- This is a build tool to speed up front-end development.
- Everything is run through the terminal, eg: `gulp watch`.
- I currently run this on Ubuntu for development.
- You do not install the `npm packages` on your live server.
- I am using `node v0.12.0`.

## What is included?
These are some of the front-end tools at your disposal.

- Babel
- Bootstrap 3
- DevIcons
- Font-Awesome
- jQuery 2
- jQuery Lazyload
- React + JSX
- Select2 (And Bootstrap CSS)
- Note: jQuery + Bootstrap are compiled into dependencies.min.js & dependencies.min.css, you can use this if you like or just use the files from the `third-party/` folder.

## Requirements
You must have the following packages installed on your system:

- nodejs
- npm
- bower (optional)

## Setup & Configuration

Setup is very easy, it takes one command: `npm install`

It may take a few moments to install, but when it is complete you are good to go. Using `babel-preset-es2015` includes babel for all NodeJS versions.

To use the default configuration rename: `config-gulp.yml.sample` to `config-gulp.yml`.
You can also place this a folder below (see why).

#### Git Submodule In Your Project
If you'd like to run this up to date in an your project while preserving this as a `git module` you would do the following:

    cd /your-app/
    git submodule add git@github.com:JREAM/frontend-develop.git develop
    cp develop/config-gulp.yml.sample config-gulp.yml
    cd develop
    gulp

#### Changing Configuration
The default directories are as follows:

- `/src` - Your custom files, your files can be named anything.
    - `/js`
    - `/sass`
    - `/img`
- `dist` - Your rendered, combined and compressed content
    - `/css`
    - `/fonts`
    - `/img`
    - `/js`
    - `/third-party`

The **default** distribution, or rendered file names are:

- `app.min.css`
- `app.min.js`
- `dependencies.min.css`
- `dependencies.min.js`

The above files would go in your HTML file, and any other extra items under `/third-party` if you wanted them included.

#### Change Configuration Output
To change the names and locations of your output, edit `config-gulp.yml`.
Modify whatever you like. However, you should **not** edit the `third_party` parameters.

#### Live Browser Reload
To get the live browser reloading running you need to set **two values**.

**The first** is the location to your projects main entry point in `config-gulp.yml`.
Change this line `browser_proxy: "localhost/your-project"` to your path.

**The second** is the location of your view files in `config-gulp.yml`.
Change this line `template_files: "../app/views/**/*.volt"` to your relative view path.

All you have to do now is run `gulp watch` and BrowserSync will reload all your SASS/JS/HTML editing on the fly.

### Third Party

Third party data comes from `package.json`. This gathers data from the `node_modules` folder.

### Usage

First create a SASS or JS file (or both) and run gulp, then check your output folder.

| Command           | Result |
|-------------------|--------|
| `gulp`            | Runs: All Commands except Watch            |
| `gulp img`        | Runs: Image Minifier                       |
| `gulp js`         | Runs: Custom JS                            |
| `gulp sass`       | Runs: Custom SASS                          |
| `gulp third_party`| Runs: Compiles Third Party JS and CSS      |
| `gulp watch`      | Runs: Browser Live Reload of JS, SASS, IMG |

## Shoutouts

[Dan Sackett](https://github.com/dansackett) - Got me into Gulp :)
