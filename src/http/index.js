import axios from "axios";

const baseURL = 'http://localhost:5000/';
  
const api = axios.create({
  baseURL,
  headers:  { "Content-Type": "application/json", }
});

export { api }