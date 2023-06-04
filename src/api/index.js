import axios from "axios";

const API_URL = "_API_BASE_URL"

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        post: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true
        }
    }
});

export default $api;