import axios from "axios";

const localhost_url = "http://localhost:3001/api/v1";
const heroku_url = "https://nameless-ridge-86180.herokuapp.com/api/v1";

const Api = axios.create({ baseURL: heroku_url });

export default Api;
