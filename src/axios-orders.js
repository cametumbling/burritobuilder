import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burritobuilder-15294.firebaseio.com/'
});

export default instance;
