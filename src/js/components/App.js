
import Main from '../containers/Main';
import React, { Component } from 'react';

export default class App extends Component {
  displayName: 'App';

  render () {
    return (
      <div className='root'>
        <Main />
      </div>
    );
  }

}
