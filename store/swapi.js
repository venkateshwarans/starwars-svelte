import { writable } from 'svelte/store'
import {swaAPI} from '../helper/swApiWrapper.js';

export const data = writable(undefined);

export const fetchState = writable('Initial');

export function getStars(idx) {
  fetchState.set('Loading');
  return swaAPI.getVehicles({page: idx})
    .then((_data) => {
      data.set(_data)
      fetchState.set('Done');
      return _data
    });
}

getStars(1);
