/*eslint-disable */
declare type EsriView = Object | {
  goTo: () => void,
  zoom: number,
  ready: bool
};

declare module 'esri/Map' {
  declare class Map {
    constructor(options:Object): void;
  }
  declare var exports: Class<Map>;
}

declare module 'esri/request' {
  declare function exports(url: string, options: Object): Promise<Object>;
}
