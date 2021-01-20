import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333/";


const tourService = {
  getTours: () => axios.get("tours"),
  addTour: (data) => axios.post("tours", data),
  getTour: (id) => axios.get(`tours/${id}`),
  deleteTour: (id) => axios.delete(`tours/${id}`, { data: { _id: id } }),
};

export default tourService;
