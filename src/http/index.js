import axios from "axios";

const baseURL = 'http://localhost:5000/';
  
const api = axios.create({
  baseURL,
  headers:  { "Content-Type": "application/json", }
});

api.interceptors.request.use(function (config) {
  config.headers = {
    useridentifier: window.localStorage.getItem('userIdentifier')
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export { api }