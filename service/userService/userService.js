import { CREATE_USER_API_URL } from "../urlApi";
import axios from "axios";

export const userService = {
  createUser: (payload) => {
    return axios({
      url: CREATE_USER_API_URL,
      method: "POST",
      data: payload,
    });
  },

  updateUser: (payload) => {
    return axios({
      url: `${CREATE_USER_API_URL}/${payload.id}`,
      method: "PUT",
      data: payload,
    });
  },

  deleteUser: (payload) => {
    return axios({
      url: `${CREATE_USER_API_URL}/${payload.id}`,
      method: "DELETE",
    });
  },

  getAllUsers: (payload) => {
    return axios({
      url: CREATE_USER_API_URL,
      method: "GET",
    });
  },
};
