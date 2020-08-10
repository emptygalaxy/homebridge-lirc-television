import { API } from 'homebridge';
import {TelevisionAccessory} from './TelevisionAccessory';

/**
 * This method registers the platform with Homebridge
 */
export = (api: API) => {
    api.registerAccessory('ir-television', TelevisionAccessory);
}