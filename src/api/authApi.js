import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyDUxbQD--HmS6Zf3E8DJ4KyYBEBNETIncY',
  },
});

console.log(process.env.NODE_ENV);

export default authApi;
