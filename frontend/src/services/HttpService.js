import Axios from 'axios';

const BASE_URL = (process.env.NODE_ENV === 'production')
  ? '/api/'
  : '//localhost:3000/api/';


var axios = Axios.create({
  withCredentials: true
});

async function _ajax(endpoint, method = 'GET', data = null, params = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params
    })

    return res.data;
  } catch (err) {
    console.warn('In HttpService.js : ', err)
    throw err;
  }
}

export default {
  get(endpoint, params = {}) {
    return _ajax(endpoint, 'GET', null, params)
  },
  post(endpoint, data) {
    return _ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return _ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return _ajax(endpoint, 'DELETE', data)
  }
}