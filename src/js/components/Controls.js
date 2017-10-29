import { toggleShareModal, toggleLocateModal } from 'js/actions/mapActions';
import React, { Component } from 'react';
import appStore from 'js/appStore';

const ANIMATION_OPTIONS = { duration: 300 };
const ZOOM_OUT_MARKUP = '<use xlink:href="#icon-zoom-out" />',
      ZOOM_IN_MARKUP = '<use xlink:href="#icon-zoom-in" />',
      LOCATE_MARKUP = '<use xlink:href="#icon-locate" />',
      SHARE_MARKUP = '<use xlink:href="#icon-share" />';

export default class Controls extends Component {
  displayName: 'Controls';

  zoomIn = () => {
    const {view} = this.props;
    if (view) {
      view.goTo({ zoom: view.zoom + 1 }, ANIMATION_OPTIONS);
    }
  };

  zoomOut = () => {
    const {view} = this.props;
    if (view) {
      view.goTo({ zoom: view.zoom - 1 }, ANIMATION_OPTIONS);
    }
  };

  locate = () => {
    appStore.dispatch(toggleLocateModal({ visible: true }));
  };

  share = () => {
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
              dangerouslySetInnerHTML={{ __html: ZOOM_OUT_MARKUP }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.zoomIn}>
            <svg
              role='img'
              aria-label='Zoom in'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: ZOOM_IN_MARKUP }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.share}>
            <svg
              role='img'
              aria-label='Share your experience'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: SHARE_MARKUP }} />
          </li>
          <li className='map-controls__item pointer' onClick={this.locate}>
            <svg
              role='img'
              aria-label='Find my location'
              className='map-controls__item-icon'
              dangerouslySetInnerHTML={{ __html: LOCATE_MARKUP }} />
          </li>
        </ul>
      </div>
    );
  }
}
