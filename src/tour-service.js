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

    axios.post("tours", fd, config);
  },
  getTour: (id) => axios.get(`tours/${id}`),
  deleteTour: (id) => axios.delete(`tours/${id}`, { data: { _id: id } }),
};

export default tourService;
