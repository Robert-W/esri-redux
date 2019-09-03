import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';

export const getMap = (features, mapOptions) => {
    const map = new EsriMap({
        layers: features,
        ...mapOptions
    });
    return map;
};

export const getFeatureLayer = (url, outfields, template) => {
    const featureLayer = new FeatureLayer({
      url: url,
      popupTemplate: template,
      outFields: outfields
    });
    return featureLayer;
};


