import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";
const token = localStorage.getItem("token");
const authAxios = axios.create({
  headers: { Authorization: `Bearer ${token}` },
});

const tourService = {
  getTours: () => axios.get("tours"),
  addTour: (data) => {
    let fd = new FormData();
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    for (let key in data) {
      fd.append(key, data[key]);
    }
    return axios.post("tours", fd, config);
  },
  getTour: (id) => axios.get(`tours/${id}`),
  editTour: (id, data) => axios.put(`tours/${id}/edit`, data),

  deleteTour: (id) => {
    console.log(localStorage.getItem("token"));
    return authAxios.delete(`tours/${id}`, { data: { _id: id } });
  },
  addUser: (data) => axios.post("/signup", data),
  login: (data) => axios.post("/login", data),
};

export default tourService;
