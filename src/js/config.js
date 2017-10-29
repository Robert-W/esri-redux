export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const TEXT = {
  title: 'Esri Redux Example',
  subtitle: 'Example with Redux, React, Esri, Sass, and more.'
};

export const MAP_OPTIONS = {
  basemap: 'streets-vector'
};

export const VIEW_OPTIONS = {
  ui: { components: ['logo', 'attribution'] },
  center: [-35.55, 26.53],
  zoom: 2
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
