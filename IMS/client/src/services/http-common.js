// src/services/http-common.js
import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});
