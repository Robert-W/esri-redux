import { viewCreated, getItemInfo } from 'js/actions/mapActions';
import { MAP_OPTIONS, VIEW_OPTIONS, URLS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import React, { Component } from 'react';
import appStore from 'js/appStore';
import EsriMap from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer'; //Feature Layer
import Popup from 'esri/widgets/Popup';

export default class Map extends Component {
  displayName: 'Map';
  state = appStore.getState();
  view = {};

  componentDidMount() {
    let earthquakeTemplate = {
      title: 'Incident: {time} at {place}',
      content: '{*}'
    };
    let drinkingWaterTemplate = {
      title: 'Drinking Water Open Street Map',
      content: '{*}'
    };
    // Subscribe to the store for updates
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);
    const featureLayer = new FeatureLayer({
      url: URLS.featureLayer,
      outFields: ['*'],
      popupTemplate: earthquakeTemplate
    });
    const waterFeatureLayer = new FeatureLayer({
      url: URLS.waterFeatureLayer,
      popupTemplate: earthquakeTemplate,
      outFields: ['*']
    });

    const map = new EsriMap({
      layers: [featureLayer, waterFeatureLayer],
      ...MAP_OPTIONS
    });

    // Create our map view
    const promise = new MapView({
      container: this.refs.mapView,
      map: map,
      layers: [featureLayer, waterFeatureLayer], //add the feature layer defined above
      ...VIEW_OPTIONS
    });

    featureLayer.popupTemplate = earthquakeTemplate;
    waterFeatureLayer.popupTemplate = drinkingWaterTemplate;
    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
      //- Webmap from https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
      // appStore.dispatch(getItemInfo('e691172598f04ea8881cd2a4adaa45ba'));
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeDidUpdate = () => {
    this.setState(appStore.getState());
  };

  render () {
    const {shareModalVisible, locateModalVisible} = this.state;

    return (
      <div ref='mapView' className='map-view'>
        <Controls view={this.view} />
        <Spinner active={!this.view.ready} />
        <ShareModal visible={shareModalVisible} />
        <LocateModal visible={locateModalVisible} />
      </div>
    );
  }
}
