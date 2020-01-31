import TuneService from '../services/TuneService';

// THUNK
export function loadTunes() {
  return async dispatch => {
    const tunes = await TuneService.query();
    dispatch(_setTunes(tunes));
  };
}

function _setTune(tune) {
  return { type: 'SET_TUNE', tune }
}

// ACTION CREATORS
function _setTunes(items) {
  return { type: 'SET_TUNES', items };
}
