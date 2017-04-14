import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MapView from 'js/components/MapView';
import Header from 'js/components/Header';
import React, {Component} from 'react';
import {text} from 'js/config';

//- Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//- Set the user agent so server rendering works
lightBaseTheme.userAgent = 'all';

export default class App extends Component {
  displayName: 'App';

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className='root'>
          <Header title={text.title} subtitle={text.subtitle} />
          <MapView />
        </div>
      </MuiThemeProvider>
    );
  }

}
