import {
  UPDATE_PUBLICATIONS,
  LOADING,
  ERROR,
  LOADING_COMMENTS,
  LOADING_COMMENTS_ERRORS,
  UPDATE_COMMENTS
} from "../types/publicationsTypes";

const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: "",
  loadingComments: false,
  loadingCommentsError: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: ""
      };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, error: action.payload, loading: false };

    case UPDATE_COMMENTS:
      return {
        ...state,
        publications: action.payload,
        loadingComments: false,
        loadingCommentsError: ""
      };

    case LOADING_COMMENTS:
      return { ...state, loadingComments: true };

    case LOADING_COMMENTS_ERRORS:
      return {
        ...state,
        loadingCommentsError: action.payload,
        loadingComments: false
      };

    default:
      return state;
  }
};
