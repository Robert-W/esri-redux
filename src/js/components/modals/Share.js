// @flow
import {toggleShareModal} from 'js/actions/mapActions';
import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';
import appStore from 'js/appStore';
// Type Import
import type {ModalProps} from './Types';

export default class ShareModal extends Component {

  props: ModalProps;

  close:Function = () => {
    appStore.dispatch(toggleShareModal({ visible: false }));
  };

  render () {
    const {visible} = this.props;

    return (
      <Wrapper theme='share-modal' visible={visible} close={this.close}>
        <h3>Share Something</h3>
      </Wrapper>
    );
  }
}
