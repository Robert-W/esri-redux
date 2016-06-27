# esri-redux
> Simple boilerplate demonstrating how to setup a project using React, Redux, Flow (if wanted), and the Esri JavaScript API. Demo available at [https://robert-w.github.io/esri-redux/](https://robert-w.github.io/esri-redux/).

### Getting started
This project requires [Node.js](https://nodejs.org/en/)

1. `npm install`
2. `npm start` or `npm secure`
3. Open `http://localhost:3000` or `https://localhost:3000`

`npm install` will install most dependencies and on `postinstall`, bower will install the rest.  This project has browser sync setup with live reload, so it will refresh as you develop.

### NPM scripts
`npm start`
> Starts the babel-cli, watches your html and sass files for changes, and starts browser-sync with live reload.  Generated/copied files will end up in the build directory which is where browser-sync serves from.

`npm test`
> Tests all src files with eslint and runs flow against all the files that have opted in (via the /\* @flow \*/ comment).

`npm run dist`
> Generates an optimized build in the `dist` directory. It uses gulp-sass for sass files, gulp-replace to inject critical.css into the html, react-prerender & babel to pre-render components and webpack to transpile, bundle, and minify the src. For more info, see [Building - Webpack](building-webpack).

`npm run secure`
> Same as `npm start` but uses HTTPS instead of HTTP. See [HTTPS](#HTTPS).

### Tooling

#### Type Checking - Flow
This project demonstrated the basics of Flow and how to set it up and test it. I will try to add more advanced Flow options and configurations as time goes on and I learn more about how Flow works. There are also other enhancements I would like to add, like live Flow checking with `linter-flow` in Atom.

#### CSS Preprocessing - Sass
This uses gulp-sass at the moment for portability, but it may be switched for the official sass Ruby gem at some point if it becomes necessary, for now this works. Also since this uses browser-sync, if you reconfigure the `sass-build` gulp task to only process `app.scss` and put `critical.scss` into a separate task, browser-sync would inject the css into the page without reload.

#### ES6 - Babel
This uses Babel for transpiling the build, it also uses `React`, `es2015`, and `stage-0` presets so I can play with the latest ES6 features.  It will strip the Flow types from the code when it compiles to AMD so that there is no issue at runtime in the browser.

#### Building - Webpack
Webpack and dojo used to not play nice together, but then I saw [https://github.com/lobsteropteryx/esri-webpack](https://github.com/lobsteropteryx/esri-webpack) which cleverly handled the esri dependencies as externals and built to AMD.  Now we have Webpack and dojo working together.  This also uses hot module replacement with gulp/browser-sync so if you edit your components, it can swap them out on the fly without reloading the whole page.

#### Prerendering - React-Prerender
A while back I wrote this little utility to read in AMD modules in node and render the component to a string before injecting it into the html page.  This is honestly a bit ugly but it works.  I believe with any JavaScript UI framework you need to pre-render your content so the user does not have to wait for the library to load and the first render pass to show them your app, so this is an important part of the build process.  This may change if I discover a better way to do this.

See [Resources](#resources)


### Performance considerations
1. Prerender with [react-prerender](https://github.com/Robert-W/react-prerender).  This will prerender your react component and inject it into your html.  This will give the appearance that your components have already rendered when the page loads without having to wait for the JSAPI, React, or your own modules to load.  Once react loads, it will mount to it and start from there.
2. Async assets when possible.  The ArcGIS Javascript API is loaded with an async tag.  It also will defer loading `app.css` and Esri's CSS until after the above the fold content loads, this is so that those assets don't block the loading of the main `index.html` file.
3. Inject `critical.css` into `index.html` so that above the fold content does not need another trip to the server to render properly, thus avoiding that annoying flash of un-styled content that some pages have.

### Security
This has the ability to run in HTTPS since it uses protocol agnostic resources. It also has a Content Security Policy with the following configurations for local resources and `js.arcgis.com` resources, which can be tweaked or removed from the app by modifying it in the head section of `src/index.html`.

```
script-src 'self' js.arcgis.com 'unsafe-inline' 'unsafe-eval';
style-src 'self' js.arcgis.com 'unsafe-inline';
```

### HTTP/2 & HTTPS
There are currently multiple options for HTTPS but only one for an HTTP/2 setup. The easiest way to run https is to run `npm run secure`.  It will load a browser sync server using https but will show as unsecure unless you have signed certs for localhost. The other option is to use [Caddy](https://caddyserver.com/).  It is really easy to install and configure.  This will run an HTTP/2 and HTTPS-enabled server for you once you generate some local self-signed certs.  Here is how to set that up.

1. [Download Caddy](https://caddyserver.com/docs/getting-started), you may need [Go](https://golang.org/) installed.
2. Setup local certs, you can run the command `npm run setupHTTPS`, this will prompt you for a few questions and then generate the certs for you, this does require `openssl` to be installed.
3. Run `sudo caddy` to start the caddy server, you can see the server configuration in the `Caddyfile`.

Now your running HTTP/2 with automatic HTTPS enabled!! This does not do hot module replacement or live reload or anything like that, however, after you generate a build with `npm run dist`, you can run Caddy and test your app out on HTTP/2 and HTTPS.



#### Resources
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Flow](http://flowtype.org/)
* [Webpack](https://webpack.github.io/)
* [ArcGIS JavaScript API](https://js.arcgis.com)
* [React-Prerender](https://github.com/Robert-W/react-prerender)
* [Great talk from Yan Zhu on Security, HTTPS, and CSP](https://www.youtube.com/watch?v=CDdYu2CJ-SU)
* [Content-Security-Policy Spec](https://www.w3.org/TR/CSP/)
* [Tutorial on Content-Security-Policy Meta tags](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
