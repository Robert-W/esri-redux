import esriRequest from 'esri/request';
import { URLS } from 'js/config';

export default {

  /**
  * @param {string} appid - Application Id or Webmap Id to get info about
  */
  getItemInfo: appid => {
    return esriRequest(URLS.itemInfo(appid), {
      responseType: 'json'
    });
  }

};
