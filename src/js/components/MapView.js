/* @flow */
import LocateModal from 'js/components/modals/Locate';
import ShareModal from 'js/components/modals/Share';
import {mapOptions, viewOptions} from 'js/config';
import {viewCreated} from 'js/actions/mapActions';
import Controls from 'js/components/Controls';
import React, {Component} from 'react';
import appStore from 'js/appStore';
import MapView from 'esri/views/MapView';
import EsriMap from 'esri/Map';

export default class Map extends Component {

  displayName: 'Map';
  state: AppState;
  props: any;
  unsubscribe: Function;

  state: AppState = appStore.getState();
  view: EsriView = {};

  constructor (props?: any) {
    super(props);
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);
  }

  componentDidMount() {
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
        <LocateModal active={locateModalVisible} />
        <ShareModal active={shareModalVisible} />
      </div>
    );
  }
}
