import axios from 'axios';

const baseURL = 'http://localhost:5001'; // или Render URL

const createAxios = (token) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default createAxios;
