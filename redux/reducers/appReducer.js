import {
  DELETE_USER,
  SET_NAME,
  SET_USERS,
  UPDATE_USER,
} from "../actions/types";

const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return (state = [...state, action.payload]);
    case SET_USERS:
      return (state = action.payload);
    case DELETE_USER:
      return (state = state.filter((user) => user.id !== action.payload));
    case UPDATE_USER:
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
      return state;
    default:
      return state;
  }
};
