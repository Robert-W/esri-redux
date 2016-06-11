export const initialState = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const text = {
  title: 'Esri Redux Example',
  subtitle: 'Example with Redux, React, Esri, Sass, and more.'
};

export const mapOptions = {
  basemap: 'streets-navigation-vector'
};

export const viewOptions = {
  ui: { components: ['logo', 'attribution'] },
  center: [-35.55, 26.53],
  zoom: 2
};

export const urls = {
  itemInfo: (appid: string) => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
