import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7777/', // moslashtiring
  timeout: 100000,
});

export default instance;
