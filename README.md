# Frontend-Dev

- This is a build tool to speed up front-end development.
- Only the output code should be accessible through the web.

## Requirements

- nodejs
- npm
- bower (optional)

## Configuration

- Run: `npm install`
- Rename `config.yml.sample` to `config.yml`
    - This is where you can configure everything.
- Default Settings are as follows:
    - `/src` is where your custom files go.
    - `/dist` is where the final files will go.

### JS (JavaScript)

Put all custom JS in the `js` folder, it will be compiled down.

### SASS (CSS/StyleSheets)

Put all custom SASS in the `sass` folder, it will be compiled down.

### IMG (Images)

Put any images you want compressed into the `img` folder, it will be compressed.

### Third Party

Third party data comes from `package.json`. This gathers data from the `node_modules` folder.

### Browser Live Reload

You must set the proxy to where your local site is hosted for live refresh.

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

## @Todo

- Implement Babel for ECMA6/ECMA2015
- Implement a `move` method to keep a submodule.
- I may have to possibly add instructions to have the `config.yml` below the
  project root so that the submodule remains intact and parent project commits
work fine.

