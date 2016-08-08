// @flow
export const initialState:AppState = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  itemInfo: {}
};

export const text:{[key:string]: string} = {
  title: 'Esri Redux Example',
  subtitle: 'Example with Redux, React, Esri, Sass, and more.'
};

export const mapOptions:{[key:string]: any} = {
  basemap: 'streets-navigation-vector'
};

export const viewOptions:{[key:string]: any} = {
  ui: { components: ['logo', 'attribution'] },
  center: [-35.55, 26.53],
  zoom: 2
};

export const urls = {
  itemInfo: (appid: string) => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
