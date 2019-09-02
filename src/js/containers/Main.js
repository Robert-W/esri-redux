import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, { Component } from 'react';
import { TEXT } from 'js/config';
import LayerFilter from 'js/components/LayerFilter';

export default class App extends Component {

  displayName: 'Main';
  constructor(props) {
      super(props);
  }

  _registerClick(e) {
      console.log('callback coming!');
      console.log(e, 'the event');
  }

  render () {
    return (
      <div className='root'>
        <Header title={TEXT.title} subtitle={TEXT.subtitle} />
        <div className="filter-container">
        <LayerFilter
            title={TEXT.earthquakeFilterTitle}
            onClick={e => {
                this._registerClick(e);
            }}
        />
        <LayerFilter
            title={TEXT.drinkingWaterFilterTitle}
            onClick={e => {
                this._registerClick(e);
            }}
        />
        </div>
        <MapView />
      </div>
    );
  }

}
