import * as config from '../src/js/config';

describe('Config Tests', () => {

  // Make sure required properties exist and are correct types
  test('Text must contain title and subtitle', () => {
    expect(config.TEXT).toBeDefined();
    expect(config.TEXT.title).toBeDefined();
    expect(config.TEXT.subtitle).toBeDefined();
    expect(typeof config.TEXT.title).toMatch('string');
    expect(typeof config.TEXT.subtitle).toMatch('string');
  });

  test('Map Options must contain a basemap', () => {
    expect(config.MAP_OPTIONS).toBeDefined();
    expect(config.MAP_OPTIONS.basemap).toBeDefined();
    expect(typeof config.MAP_OPTIONS.basemap).toMatch('string');
  });

  test('View options should have a center and zoom configured at minimum', () => {
    expect(config.VIEW_OPTIONS).toBeDefined();
    expect(config.VIEW_OPTIONS.center).toHaveLength(2);
    expect(config.VIEW_OPTIONS.center[0]).toEqual(expect.any(Number));
    expect(config.VIEW_OPTIONS.center[1]).toEqual(expect.any(Number));
    expect(config.VIEW_OPTIONS.zoom).toEqual(expect.any(Number));
  });

  test('Our initial state should have view ready equal to false', () => {
    expect(config.INITIAL_STATE).toBeDefined();
    expect(config.INITIAL_STATE.viewReady).toBeFalsy();
  });

  test('No url\'s should contain localhost', () => {
    Object.keys(config.URLS).forEach(key => {
      let entry = config.URLS[key];
      if (typeof entry === 'function') {
        expect(entry().indexOf('localhost')).toBe(-1);
      } else if (typeof entry === 'string') {
        expect(entry.indexOf('localhost')).toBe(-1);
      }
    });
  });

});
