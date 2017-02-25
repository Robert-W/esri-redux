import * as config from '../src/js/config';

// Make sure config is exporting correctly
test('Config should be defined', () => {
  expect(config).toBeDefined();
});

// Make sure required properties exist and are correct types
test('Text must contain title and subtitle', () => {
  expect(config.text).toBeDefined();
  expect(config.text.title).toBeDefined();
  expect(config.text.subtitle).toBeDefined();
  expect(typeof config.text.title).toMatch('string');
  expect(typeof config.text.subtitle).toMatch('string');
});

test('Map Options must contain a basemap', () => {
  expect(config.mapOptions).toBeDefined();
  expect(config.mapOptions.basemap).toBeDefined();
  expect(typeof config.mapOptions.basemap).toMatch('string');
});

test('View options should have a center and zoom configured at minimum', () => {
  expect(config.viewOptions).toBeDefined();
  expect(config.viewOptions.center).toHaveLength(2);
  expect(config.viewOptions.center[0]).toEqual(expect.any(Number));
  expect(config.viewOptions.center[1]).toEqual(expect.any(Number));
  expect(config.viewOptions.zoom).toEqual(expect.any(Number));
});

test('Our initial state should have view ready equal to false', () => {
  expect(config.initialState).toBeDefined();
  expect(config.initialState.viewReady).toBeFalsy();
});

test('No url\'s should contain localhost', () => {
  Object.keys(config.urls).forEach(key => {
    const entry = config.urls[key];
    if (typeof entry === 'function') {
      expect(entry().indexOf('localhost')).toBe(-1);
    } else if (typeof entry === 'string') {
      expect(entry.indexOf('localhost')).toBe(-1);
    }
  });
});
