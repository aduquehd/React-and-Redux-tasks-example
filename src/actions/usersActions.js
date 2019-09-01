import axios from "axios";

import { GET_ALL_USERS, LOADING, ERROR } from "../types/usersTypes";

export const getAll = () => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    dispatch({
      type: GET_ALL_USERS,
      payload: response.data
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: "Users information is not available!"
    });
  }
};
