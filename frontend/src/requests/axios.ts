import axios from 'axios';

const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
