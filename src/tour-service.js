import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333/";

const tourService = {
  getTours: () => axios.get("tours"),
  addTour: (data) => {
    let fd = new FormData();
    let config = {
      header: { "content-type": "multipart/form-data" },
    };
    for (let key in data) {
      fd.append(key, data[key]);
    }
    return axios.post("tours", fd, config);
  },
  getTour: (id) => axios.get(`tours/${id}`),
  editTour: (id, data) => axios.put(`tours/${id}/edit`, data),
  deleteTour: (id) => axios.delete(`tours/${id}`, { data: { _id: id } }),
  addUser: (data) => axios.post("/signup", data),
  login: (data) => axios.post("/login", data),
};

export default tourService;
