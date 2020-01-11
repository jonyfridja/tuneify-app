import HttpService from './HttpService';

const URL_ENDPOINT = 'tune';
function query(params) {
  return HttpService.get(URL_ENDPOINT, params);
}
function getById(id, params) {
  return HttpService.get(_getUrlWithId(id), params);
}

function _getUrlWithId(id) {
  return `${URL_ENDPOINT}/${id}`
}

export default {
  query,
  getById
}