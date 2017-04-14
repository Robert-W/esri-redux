import {toggleLocateModal} from 'js/actions/mapActions';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import React, { Component } from 'react';
import appStore from 'js/appStore';

export default class LocateModal extends Component {
  displayName: 'LocateModal';

  close = () => {
    appStore.dispatch(toggleLocateModal({ visible: false }));
  };

  render () {
    const {visible} = this.props;
    const defaultButton = [
      <RaisedButton label='OK' secondary={true} keyboardFocused={true} onTouchTap={this.close} />
    ];

    return (
      <Dialog
        open={visible}
        title='Locate'
        actions={defaultButton}
        onRequestClose={this.close}>
        Find something
      </Dialog>
    );
  }
}
