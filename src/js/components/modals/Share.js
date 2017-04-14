import {toggleShareModal} from 'js/actions/mapActions';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import React, { Component } from 'react';
import appStore from 'js/appStore';

export default class ShareModal extends Component {
  displayName: 'ShareModal';

  close = () => {
    appStore.dispatch(toggleShareModal({ visible: false }));
  };

  render () {
    const {visible} = this.props;
    const defaultButton = [
      <RaisedButton label='OK' secondary={true} keyboardFocused={true} onTouchTap={this.close} />
    ];

    return (
      <Dialog
        open={visible}
        title='Share'
        actions={defaultButton}
        onRequestClose={this.close}>
        Share something
      </Dialog>
    );
  }
}
