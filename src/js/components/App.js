// import MapView from 'js/components/MapView';
// import Header from 'js/components/Header';
import Main from '../containers/Main';
import React, { Component } from 'react';
// import { TEXT } from 'js/config';

export default class App extends Component {
  displayName: 'App';

  render () {
    return (
      <div className='root'>
        <Main />
        {/* <Header title={TEXT.title} subtitle={TEXT.subtitle} />
        <MapView /> */}
      </div>
    );
  }

}
