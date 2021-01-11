import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333/";

const tourService = {
  getTours: () => axios.get("tours"),
};

export default tourService;
