import React, { Component } from 'react';

const STYLESHEET = {
  modalContainer: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: 10,
    left: 0,
    top: 0
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: '100%',
    width: '100%'
  },
  modal: {
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    position: 'absolute',
    padding: '30px',
    height: 'auto',
    left: '50%',
    top: '50%'
  },
  close: {
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    height: '30px',
    width: '30px',
    right: 0,
    top: 0
  },
  closeSvg: {
    fill: '#555555',
    margin: 'auto',
    height: '26px',
    width: '26px'
  },
  content: {
    maxHeight: '450px',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '5px'
  }
};

export default class ModalWrapper extends Component {
  displayName: 'ModalWrapper';

  render () {
    let { visible, close, theme } = this.props;
    let containerStyle = Object.assign({}, STYLESHEET.modalContainer);
    //- Build up the attributes
    let modalAttrs = {
      style: STYLESHEET.modal
    };

    //- show or hide the container
    containerStyle.display = visible ? 'block' : 'none';

    //- add a className if theme is provided
    if (theme) { modalAttrs.className = theme; }

    return (
      <div style={containerStyle}>
        <div style={STYLESHEET.modalBackground} onClick={close} />
        <article {...modalAttrs}>
          <div title='close' style={STYLESHEET.close} onClick={close}>
            <svg style={STYLESHEET.closeSvg} viewBox='0 0 25 25'>
              <title>Close</title>
              <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z"></path>
            </svg>
          </div>
          <div style={STYLESHEET.content}>
            {this.props.children}
          </div>
        </article>
      </div>
    );
  }
}
