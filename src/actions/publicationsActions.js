import axios from "axios";

import {
  UPDATE_PUBLICATIONS,
  LOADING,
  ERROR,
  LOADING_COMMENTS,
  LOADING_COMMENTS_ERRORS,
  UPDATE_COMMENTS
} from "../types/publicationsTypes";
import { GET_ALL_USERS } from "../types/usersTypes";

export const getUserPublications = key => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });

  let { users } = getState().usersReducer;
  const { publications } = getState().publicationsReducer;
  const userId = users[key].id;

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    const newPublications = response.data.map(publications => ({
      ...publications,
      comments: [],
      open: false
    }));

    const updatedPublications = [...publications, newPublications];

    dispatch({
      type: UPDATE_PUBLICATIONS,
      payload: updatedPublications
    });

    const publicationsKey = updatedPublications.length - 1;

    const newUsers = [...users];

    newUsers[key] = {
      ...users[key],
      publicationsKey
    };

    dispatch({
      type: GET_ALL_USERS,
      payload: newUsers
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: "Publications not available"
    });
  }
};

export const openClose = (publicationKey, commentKey) => (
  dispatch,
  getState
) => {
  const { publications } = getState().publicationsReducer;
  const selected = publications[publicationKey][commentKey];

  const updated = {
    ...selected,
    open: !selected.open
  };

  let updatedPublications = [...publications];
  updatedPublications[publicationKey] = [...publications[publicationKey]];
  updatedPublications[publicationKey][commentKey] = updated;

  dispatch({
    type: UPDATE_COMMENTS,
    payload: updatedPublications
  });
};

export const getComments = (publicationKey, commentKey) => async (
  dispatch,
  getState
) => {
  const { publications } = getState().publicationsReducer;
  const selected = publications[publicationKey][commentKey];

  dispatch({
    type: LOADING_COMMENTS
  });

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
    );

    const updated = {
      ...selected,
      comments: response.data
    };

    let updatedPublications = [...publications];
    updatedPublications[publicationKey] = [...publications[publicationKey]];
    updatedPublications[publicationKey][commentKey] = updated;

    dispatch({
      type: UPDATE_COMMENTS,
      payload: updatedPublications
    });
  } catch (e) {
    dispatch({
      type: LOADING_COMMENTS_ERRORS,
      payload: "Comments information is not available"
    });
  }
};
