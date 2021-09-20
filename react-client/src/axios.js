import axios from "axios";
const URL = window.location.protocol + "//" + window.location.host;
export default axios.create({
  baseURL: URL,
});
