import customInstance from "./utils/api";

console.log(process.env.NODE_ENV);
const tourService = {
  getTours: () => customInstance.get("tours"),
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
    return customInstance.post("tours", fd, config);
  },
  getTour: (id) => customInstance.get(`tours/${id}`),
  editTour: (id, data) => {
    let user = localStorage.getItem("user");
    return customInstance.put(`tours/${id}/edit`, {
      user: user,
      editedTourData: data,
    });
  },

  deleteTour: (id) =>
    customInstance.delete(`tours/${id}`, { data: { _id: id } }),
  addUser: (data) => customInstance.post("api/signup", data),
  login: (data) => customInstance.post("login", data),
  addBooking: (data) => customInstance.post("bookings", data),
  getBookings: () => customInstance.get("bookings"),
};

export default tourService;
