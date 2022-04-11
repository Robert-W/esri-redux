import { viewCreated, getItemInfo, } from 'js/actions/mapActions';
import { MAP_OPTIONS, VIEW_OPTIONS, URLS, OUT_FIELDS } from 'js/config';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import Controls from 'js/components/Controls';
import MapView from 'esri/views/MapView';
import React, { Component } from 'react';
import appStore from 'js/appStore';
import FeatureLayer from 'esri/layers/FeatureLayer';
import {earthquakePopupTemplate, drinkingWaterPopupTemplate} from '../constants/popupTemplates'; //Import Popup Templates
import { getMap, getFeatureLayer } from '../utils/map-helper';
import {getTimestamp} from '../utils/timestamp-helper';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this._createMapView = this._createMapView.bind(this);
    /*
      Create feature layers.
      Import templates for pop-ups.
      Specify outfields that we want to pull in.
    */
    this.earthquakeFeatureLayer = getFeatureLayer(URLS.featureLayer, OUT_FIELDS.earthquakeLayer, earthquakePopupTemplate);
    this.waterFeatureLayer = getFeatureLayer(URLS.waterFeatureLayer, OUT_FIELDS.waterLayer, drinkingWaterPopupTemplate);

}
  displayName: 'Map';
  state = appStore.getState();
  view = {};

  //Abstracted Create Map View function from lifecycle methods into a helper function
  _createMapView(map) {
    const promise = new MapView({
      container: this.refs.mapView,
      map: map,
      ...VIEW_OPTIONS
    });
    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
      //- Webmap from https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
      //appStore.dispatch(getItemInfo('e691172598f04ea8881cd2a4adaa45ba'));
    });
  }

  //When the component unmounts, set the filters to null;
  componentWillUnmount() {
    this.earthquakeFeatureLayer.filter = null;
    this.waterFeatureLayer.filter = null;
    this.unsubscribe();

  }


  componentDidMount() {
    /*
      When the component mounts for the first time, make sure
      filters are null.
    */
    this.earthquakeFeatureLayer.filter = null;
    this.waterFeatureLayer.filter = null;
    // Subscribe to the store for updates
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);
    //Call helper function to get initial map and create view on mount:
    let map = getMap([this.earthquakeFeatureLayer, this.waterFeatureLayer], MAP_OPTIONS);
    this._createMapView(map);
  }

  /*
    Check to see if the filter props have changed when new props are received.
    If they have changed, apply (or remove) the filter from the appropriate feature
    layer.
  */
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*
      If the filter is true, update the feature layer and call new
      render of map
    */
    if (nextProps.earthquakeFilter !== this.props.earthquakeFilter) {
      if (nextProps.earthquakeFilter) {
        const targetTime = getTimestamp();
        //this.earthquakeFeatureLayer.setDefinitionExpression("TIME=0");
        this.earthquakeFeatureLayer.filter = {
          where: `Time > ${targetTime}`
        };
        let map = getMap([this.earthquakeFeatureLayer, this.waterFeatureLayer], MAP_OPTIONS);
            this._createMapView(map);
      } else {
        this.earthquakeFeatureLayer.filter = null;
        let map = getMap([this.earthquakeFeatureLayer, this.waterFeatureLayer], MAP_OPTIONS);
        this._createMapView(map);
      }
    }
     /*
      If the filter is true, update the feature layer and call new
      render of map
    */
    if (nextProps.waterFilter !== this.props.waterFilter) {
      console.log('true, new water filter props', this.props.waterFilter);
      if (nextProps.waterFilter) {
        this.waterFeatureLayer.filter = {
              where: "amenity = 'drinking_water'"
            };
            //this.waterFeatureLayer.setDefinitionExpression("amenity='drinking_water'");
            let map = getMap([this.earthquakeFeatureLayer, this.waterFeatureLayer], MAP_OPTIONS);
            this._createMapView(map);

      } else {
        this.waterFeatureLayer.filter = null;
      }
    }
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
