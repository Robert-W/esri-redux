// @flow
import {toggleShareModal, toggleLocateModal} from 'js/actions/mapActions';
import React, {Component} from 'react';
import appStore from 'js/appStore';

const zoomOutSvg = '<use xlink:href="#icon-zoom-out" />',
      zoomInSvg = '<use xlink:href="#icon-zoom-in" />',
      locateSvg = '<use xlink:href="#icon-locate" />',
      shareSvg = '<use xlink:href="#icon-share" />';

const animationOptions = { duration: 300 };

type ControlsProps = {
  view: EsriView
};

export default class Controls extends Component {
  displayName: 'Controls';
  props: ControlsProps;

  zoomIn:Function = () => {
    const {view} = this.props;
    if (view) {
      view.goTo({ zoom: view.zoom + 1 }, animationOptions);
    }
  };

  zoomOut:Function = () => {
    const {view} = this.props;
    if (view) {
      view.goTo({ zoom: view.zoom - 1 }, animationOptions);
    }
  };

  locate:Function = () => {
    appStore.dispatch(toggleLocateModal({ visible: true }));
  };

  share:Function = () => {
    appStore.dispatch(toggleShareModal({ visible: true }));
  };

  render () {
    return (
      <div className='map-controls shadow'>
        <ul className='map-controls__list'>
          <li className='map-controls__item pointer' onClick={this.zoomOut}>
            <svg
              role='img'
              aria-label='Zoom out'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: zoomOutSvg }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.zoomIn}>
            <svg
              role='img'
              aria-label='Zoom in'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: zoomInSvg }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.share}>
            <svg
              role='img'
              aria-label='Share your experience'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: shareSvg }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.locate}>
            <svg
              role='img'
              aria-label='Find my location'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: locateSvg }} />
          </li>
        </ul>
      </div>
    );
  }
}
