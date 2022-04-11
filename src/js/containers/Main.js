import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, { Component } from 'react';
import { TEXT } from 'js/config';
import LayerFilter from 'js/components/LayerFilter';
import appStore from 'js/appStore';
import { earthquakeFilterUpdated, waterFilterUpdated } from 'js/actions/mapActions';
import {EARTHQUAKE_FILTER} from 'js/constants/filterActions';

export default class App extends Component {

  displayName: 'Main';
  state = appStore.getState();

  constructor(props) {
      super(props);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeDidUpdate = () => {
    console.log('store updating');
    this.setState(appStore.getState());
  };

  componentDidMount() {
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);
  }

  //Handle click event for filters
  _registerClick(e) {
      if (e.name === EARTHQUAKE_FILTER) {
        appStore.dispatch(earthquakeFilterUpdated({checked: e.checked}));
      } else {
        appStore.dispatch(waterFilterUpdated({checked: e.checked}));
      }
  }

  storeDidUpdate = () => {
       this.setState(appStore.getState());
  }
  render () {
    const earthquakeFilter = appStore.getState().earthquakeFilters;
    const waterFilter = appStore.getState().drinkingWaterFilters;
    return (
      <div className='root'>
        <Header title={TEXT.title} subtitle={TEXT.subtitle} />
        <div className="filter-container">
            <LayerFilter
                title={TEXT.earthquakeFilterText.title}
                name={'earthquake-filter'}
                filterText={TEXT.earthquakeFilterText.filter}
                onClick={e => {
                    this._registerClick(e);
                }}
            />
            <LayerFilter
                title={TEXT.drinkingWaterFilterText.title}
                name={'water-filter'}
                filterText={TEXT.drinkingWaterFilterText.filter}
                onClick={e => {
                    this._registerClick(e);
                }}
            />
        </div>
        <MapView
            earthquakeFilter={earthquakeFilter}
            waterFilter={waterFilter}
        />
      </div>
    );
  }

}
