/* @flow */
import {toggleShareModal} from 'js/actions/mapActions';
import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';
import appStore from 'js/appStore';

export default class ShareModal extends Component {

  props: ModalProps;

  close:Function = () => {
    appStore.dispatch(toggleShareModal({ visible: false }));
  };

  render () {
    const {active} = this.props;

    return (
      <Wrapper theme='share-modal' active={active} close={this.close}>
        <h3>Share Something</h3>
      </Wrapper>
    );
  }
}
