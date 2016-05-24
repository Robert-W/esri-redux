/* @flow */
import React, {Component} from 'react';

type ControlsProps = {
  view: EsriView
};

export default class Controls extends Component {
  displayName: 'Controls';
  props: ControlsProps;

  render () {
    return (
      <div className='map-controls'>
        Hey
      </div>
    );
  }
}
