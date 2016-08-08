import {loadCSS} from 'js/utils/loaders';
import App from 'js/components/App';
import Dom from 'react-dom';
import React from 'react';

//- Get webpack to extract this and use it to generate critical.css
//- For production, config/inline-style.js will inline this into html via html-webpack-plugin
import 'css/critical.scss';
import 'css/app.scss';

//- Lazy load esri css
loadCSS('//js.arcgis.com/4.0/esri/css/main.css');

// Apply any default configurations here if necessary


// Initialize the app
const reactMountPoint = document.getElementById('react-mount');
Dom.render(<App />, reactMountPoint);
// There is a weird issue on iOS(maybe android too, not tested) that needs to have touchmove prevented
reactMountPoint.addEventListener('touchmove', (evt) => {
  evt.preventDefault();
}, false);
