// @flow
import {viewCreated, getItemInfo} from 'js/actions/mapActions';
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import {mapOptions, viewOptions} from 'js/config';
import Controls from 'js/components/Controls';
import React, {Component} from 'react';
import appStore from 'js/appStore';
import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';

export default class Map extends Component {

  displayName: 'Map';

  state: AppState = appStore.getState();
  unsubscribe: () => void;
  view: EsriView = {};

  componentDidMount() {
    // Subscribe to the store for updates
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);

    // Create our map view
    const promise:Promise<Object> = new MapView({
      container: this.refs.mapView,
      map: new EsriMap(mapOptions),
      ...viewOptions
    });

    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
      //- Webmap from https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
      appStore.dispatch(getItemInfo('e691172598f04ea8881cd2a4adaa45ba'));
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeDidUpdate:Function = () => {
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
