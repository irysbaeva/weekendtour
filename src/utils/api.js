import axios from "axios";
import { toast } from "react-toastify";
import { options } from "../utils/constants";
import "react-toastify/dist/ReactToastify.css";
const customInstance = axios.create({
  baseURL: options[process.env.NODE_ENV].baseURL,
  headers: { Accept: "application/json" },
  validateStatus: (status) => status >= 200 && status < 300,
});

customInstance.interceptors.request.use((conf) => {
  const requestConfig = { ...conf };
  let token = localStorage.getItem("token");

  if (token) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${token} `,
    };
  }

  return requestConfig;
});

customInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    console.log(error.response);

    if (status === 401) {
      toast.error(data?.message);
      // window.location.pathname = '/'
      return Promise.reject(new Error(data?.message));
    }

    if (status === 409) {
      toast.error(data?.message);
      // console.log(data?.message);

      return Promise.reject(new Error(data?.message));
    }

    if (status === 500) {
   
        toast.error(data?.message);
        return Promise.reject(new Error(data?.message));
  
    }
    if (status === 501) {
      toast.error(data?.message);
      return Promise.reject(new Error(data?.message));}
  
    toast.error(data?.message);
    return Promise.reject(`test${error.response && error.response.data}`);
  }
);
  

export default customInstance;
