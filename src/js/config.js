export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const TEXT = {
  title: 'Earthquakes in the last 30 days with nearest drinking water sources',
  subtitle: 'Example with Redux, React, Esri, Sass, and more.',
  earthquakeFilterTitle: 'Earthquake View Filter',
  drinkingWaterFilterTitle: 'DrinkingWater View Filter'
};

export const MAP_OPTIONS = {
  basemap: 'streets-vector'
};

export const VIEW_OPTIONS = {
  ui: { components: ['logo', 'attribution'] },
  //center: [ -77.045191, 38.962726], // longitude, latitude
  //zoom: 13,
  center: [-35.55, 26.53],
  zoom: 2
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`,
  //featureLayer: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/DrinkingWaterOSM/FeatureServer/0',
  featureLayer: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Earthquakes_in_the_past_30_days/FeatureServer/0',
  waterFeatureLayer: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/DrinkingWaterOSM/FeatureServer/0'
};
