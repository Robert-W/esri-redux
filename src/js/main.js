import {loadCSS} from 'js/utils/loaders';
import App from 'js/components/App';
import Dom from 'react-dom';
import React from 'react';

//- Add these to support older browsers
import 'core-js/es6/map';
import 'core-js/es6/set';

//- Get webpack to extract this and use it to generate critical.css
//- For production, config/inline-style.js will inline this into html via html-webpack-plugin
import 'css/critical.scss';
import 'css/app.scss';

//- Lazy load esri css
loadCSS('//js.arcgis.com/4.5/esri/css/main.css');

// Apply any default configurations here if necessary

// Initialize the app
const reactMountPoint = document.getElementById('react-mount');
Dom.render(<App />, reactMountPoint);

// Enable HMR for development mode, Only use this is you are using Redux or something
// similar for state management, this will effectively reload the whole page
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('js/components/App', () => {
    const NextApp = require('js/components/App').default;
    Dom.render(<NextApp />, reactMountPoint);
  });
}
