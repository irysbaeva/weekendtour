import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";
// const token = localStorage.getItem("token");
// console.log(token);

// const authAxios = axios.create({
//   headers: { Authorization: `Bearer ${token}` },
// });

const tourService = {
  getTours: () => axios.get("tours"),
  addTour: (data) => {
    let fd = new FormData();
    let token = localStorage.getItem("token")
    let config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}` 
      },
    };
    for (let key in data) {
      fd.append(key, data[key]);
    }
    return axios.post("tours", fd, config);
  },
  getTour: (id) => axios.get(`tours/${id}`),
  editTour: (id, data) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(token);
    return axios.put(`tours/${id}/edit`, data, config)},

  deleteTour: (id) => {
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(token);

    // console.log(`token for deleting ${localStorage.getItem("token")}`);

    // authAxios.delete(`tours/${id}`, { data: { _id: id } });
    axios.delete(`tours/${id}`, config, { data: { _id: id } });
  },
  addUser: (data) => axios.post("/signup", data),
  login: (data) => axios.post("/login", data),
  addBooking: (data) => axios.post("bookings", data),
  getBookings: () => {  let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };return axios.get("bookings", config)},
};

export default tourService;
