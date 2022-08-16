import { DELETE_USER, SET_NAME, SET_USERS, UPDATE_USER } from "./types";

export const setUser = (payload) => ({
  type: SET_NAME,
  payload,
});

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

export const deleteUser = (payload) => ({
  type: DELETE_USER,
  payload,
});

export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});
