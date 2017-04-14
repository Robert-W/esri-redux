import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import renderer from 'react-test-renderer';
import MapView from 'js/components/MapView';
import React from 'react';

/**
* Snapshot testing can be very useful if used correctly, but sometimesits pretty tough to do
when you are including 3rd party libraries via generic 'import' statements. Unless addressed
properly, Jest will try to path them explicitly and it will be zero fun setting them up after
you've written a bunch of code. Here we run a test on a higher level component that has hard
esri dependencies.
*/
describe('MapView snapshot Tests', () => {

  test('Sample of snapshot testing for 3rd party components', () => {
    const header = renderer.create(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <MapView />
      </MuiThemeProvider>
    );
    const tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
