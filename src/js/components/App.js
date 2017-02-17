// @flow
import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, {Component} from 'react';
import {text} from 'js/config';

export default class App extends Component {
  displayName: 'App';
  props: any;

  render () {
    return (
      <div className='root'>
        <Header title={text.title} subtitle={text.subtitle} />
        <MapView />
      </div>
    );
  }

}
