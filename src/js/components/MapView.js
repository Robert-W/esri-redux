/* @flow */
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import Spinner from 'js/components/shared/Spinner';
import {mapOptions, viewOptions} from 'js/config';
import {viewCreated} from 'js/actions/mapActions';
import Controls from 'js/components/Controls';
import React, {Component} from 'react';
import appStore from 'js/appStore';
import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';

type AppState = {
  locateModalVisible: bool,
  shareModalVisible: bool,
  viewReady: bool
};

export default class Map extends Component {

  displayName: 'Map';
  state: AppState;
  unsubscribe: Function;

  state: AppState = appStore.getState();
  view: EsriView = {};

  componentDidMount() {
    // Subscribe to the store for updates
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);

    // Create our map view
    const promise = new MapView({
      container: this.refs.mapView,
      map: new EsriMap(mapOptions),
      ...viewOptions
    });

    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
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
