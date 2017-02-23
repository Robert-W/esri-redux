# esri-redux
> A simple boilerplate using the latest versions of React, Webpack, Redux, the Esri JavaScript API, and more. It runs in a docker container locally and allows for easy development, testing, and building. More testing with Jest and a production ready web server that can be deployed to your favorite container service are on the way. Demo available at [https://robert-w.github.io/esri-redux/](https://robert-w.github.io/esri-redux/).

### Getting started
1. Make sure you have the latest [Docker for Mac](https://www.docker.com/products/docker#/mac) (or Windows or Linux) installed. Current code uses a version 2 compose file which requires docker-compose 1.10 or higher and it will soon be using a version 3 compose file which requires 1.13 or higher.
2. Run `docker-compose up`.
3. Visit http://www.localhost:3000

### Additional Branches
1. [`master`](https://github.com/Robert-W/esri-redux/tree/master) - A non 'dockerized' version of this branch.
2. [`flow`](https://github.com/Robert-W/esri-redux/tree/flow) - A non 'dockerized' version that is the same as the master branch but is using Facebook's Flow, a static type checker.

### Docker commands

#### Running
These commands are for starting the dev server and rebuilding the dev server if needed.

- **Starting**: `docker-compose up`
- **Rebuilding**: `docker-compose up --build`. You may need to add the `--build` argument if you change a file not mapped in a volume or anytime you update the `package.json`.

#### Cleanup
If you want to remove containers, images, or volumes from your machine, you can use the following commands.

- **Remove container**: `docker rm <CONTAINER ID>`, you can view them via `docker ps -a`.
- **Remove image**: `docker rmi <IMAGE ID>`, you can view them via `docker images`.
- **Remove volumes**: `docker volume rm <VOLUME NAME>`, you can view them via `docker volume ls`. Probably won't need this command.
- **Remove all dangling images at once (`docker images` shows a name of `<none>`)**: `docker rmi $(docker images -q -f "dangling=true")`

#### Generating a deployment
This will generate a build in a local dist folder at the root of this project which you can then copy to any web server of your choosing.

- `docker-compose run web npm run dist`

#### Running tests
Run your tests inside your docker container with the following command. (Jest tests are coming soon).

- `docker-compose run web npm test`

#### Running a production web server in the container
This will allow for running a production ready express web server that can be deployed to Amazon ECS or Google's container engine built on Kubernetes.

- COMING SOON

### Tooling

#### CSS Preprocessing - Sass
This uses a sass loader in webpack so you can just import your scss in your components. Webpack will inject these as style tags in dev mode so you get live reload of css. In production, it will inline `critical.scss` and append `app.scss` into your html for you.

#### Image importing - Webpack loaders
You can also import images directly in your components using Webpack's various loaders if you would like. You can do so the same way you would import any other file, like so.

`import logoImg from 'images/logo.svg';`

and reference in JSX: `<img src={logoImg}/>`

#### ES6 - Babel
This uses Babel for transpiling the build, it also uses `React`, `es2015`, and `stage-0` presets so I can play with the latest ES6 features.  It will strip the Flow types from the code when it compiles to AMD so that there is no issue at runtime in the browser.

#### Building - Webpack
Webpack and dojo used to not play nice together, but then I saw [https://github.com/lobsteropteryx/esri-webpack](https://github.com/lobsteropteryx/esri-webpack) which cleverly handled the esri dependencies as externals and built to AMD.  Now we have Webpack and dojo working together.  This also uses hot module replacement so you can swap out your components on the fly without reloading the whole page.

See [Resources](#resources)


### Performance considerations
1. You should prerender your components by using the `prerender.js` script in the `scripts` folder. You can configure it there. This will prerender your react component and inject it into your html. Once react loads, it will mount to it and start from there.
2. Async assets when possible. The ArcGIS Javascript API is loaded with an async tag. It also will defer loading Esri's CSS until after the above the fold content loads to prevent blocking the rendering of `index.html`.
3. Inject `critical.css` into `index.html` so that above the fold content does not need another trip to the server to render properly, thus avoiding that annoying flash of un-styled content that some pages have. This is automatically handled by webpack already for you.

### Security
This has the ability to run in HTTPS since it uses protocol agnostic resources. It also has a Content Security Policy with the following configurations for local resources and `js.arcgis.com` resources, which can be tweaked or removed from the app by modifying it in the head section of `src/index.html`.

```
script-src 'self' js.arcgis.com 'unsafe-inline' 'unsafe-eval';
style-src 'self' js.arcgis.com 'unsafe-inline';
```

<!-- ### HTTP/2 & HTTPS
There are currently multiple options for HTTPS but only one for an HTTP/2 setup. The easiest way to run https is to run `npm run secure`.  It will load a browser sync server using https but will show as unsecure unless you have signed certs for localhost. The other option is to use [Caddy](https://caddyserver.com/).  It is really easy to install and configure.  This will run an HTTP/2 and HTTPS-enabled server for you once you generate some local self-signed certs.  Here is how to set that up.

1. [Download Caddy](https://caddyserver.com/docs/getting-started), you can also install with `brew install caddy` if you have homebrew installed. You will need atleast version `0.9`.
2. Run `sudo caddy` to start the caddy server, it is configured in the `Caddyfile`. Caddy is configured to use self-signed certs for local development, browsers will flag self-signed certs as untrusted but they are ok for local development.
3. [**Optional**] -Another option for self-signed certs is to set them up yourself. You can run the command `openssl req -new -newkey rsa:2048 -sha256 -days 365 -nodes -x509 -keyout cert.key -out cert.crt`, this will prompt you for a few questions and then generate the certs for you, this does require `openssl` to be installed and then you need to configure tls in the Caddfile like so: `tls cert.crt cert.key`. This is the same as step 2 except that you will not need to allow access each time you restart caddy.

Now your running HTTP/2 with automatic HTTPS enabled!! This does not do hot module replacement or live reload or anything like that, however, after you generate a build with `npm run dist`, you can run Caddy and test your app out on HTTP/2 and HTTPS. -->

#### Resources
* [Docker](https://docs.docker.com/)
* [docker-compose](https://docs.docker.com/compose/overview/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Flow](http://flowtype.org/)
* [Webpack](https://webpack.github.io/)
* [ArcGIS JavaScript API](https://js.arcgis.com)
* [React-Prerender](https://github.com/Robert-W/react-prerender)
* [Great talk from Yan Zhu on Security, HTTPS, and CSP](https://www.youtube.com/watch?v=CDdYu2CJ-SU)
* [Content-Security-Policy Spec](https://www.w3.org/TR/CSP/)
* [Tutorial on Content-Security-Policy Meta tags](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
