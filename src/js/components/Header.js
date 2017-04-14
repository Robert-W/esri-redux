import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react';
import logoImg from 'images/logo.svg';

const titleStyle = {
  alignItems: 'center',
  paddingLeft: '10px',
  fontSize: '24px',
  display: 'flex',
  color: 'white',
  margin: 0
};

export default class Header extends Component {
  displayName: 'Header';

  render () {
    const {title, subtitle} = this.props;

    return (
      <AppBar
        title={title}
        titleStyle={titleStyle}
        className='app-header'
        showMenuIconButton={false}>
        <h2 className='app-subtitle'>{subtitle}</h2>
        <img className="app-logo" src={logoImg} alt="app-logo" />
      </AppBar>
    );
  }
}
