import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.Accept = 'application/json';

axios.interceptors.response.use((response) => {
  const { data } = response;

  return data;
});

export default axios;
