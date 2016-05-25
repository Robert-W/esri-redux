import {loadCSS} from 'js/utils/loaders';
import App from 'js/components/App';
import Dom from 'react-dom';
import React from 'react';

// Lazy load css
loadCSS('css/app.css');
loadCSS('//js.arcgis.com/4.0/esri/css/main.css');

// Apply any default configurations here

// Initialize the app
Dom.render(
  <App />,
  document.getElementById('react-mount')
);
