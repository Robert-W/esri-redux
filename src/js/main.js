import {loadCSS} from 'js/utils/loaders';
import App from 'js/components/App';
import Dom from 'react-dom';
import React from 'react';

//- Get webpack to extract this and use it to generate critical.css
require('css/critical.scss');

// Lazy load css
require('css/app.scss');
loadCSS('//js.arcgis.com/4.0/esri/css/main.css');

// Apply any default configurations here

// Initialize the app
Dom.render(
  <App />,
  document.getElementById('react-mount')
);
