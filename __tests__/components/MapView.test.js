import renderer from 'react-test-renderer';
import MapView from 'js/components/MapView';
import React from 'react';

/**
* Snapshot testing can be very useful if used correctly, this example just shows how to use
* it but this is not the most useful snapshot, sometimes it is better to call it multiple
* times inside a test and take snapshots of the component changing throughout some interactions,
* Ex. snapshot default state, snapshot after click/mouseover, snapshot after mouseleave
*/
describe('MapView snapshot Tests', () => {

  test('Sample of snapshot testing, not very useful, but shows how to do it', () => {
    const header = renderer.create(
      <MapView title="Snapshot Test #1" subtitle="Test output over time in your component" />
    );
    const tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
