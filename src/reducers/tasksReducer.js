import {
  GET_ALL_TASKS,
  LOADING,
  ERROR,
  CHANGE_TITLE,
  CHANGE_USER_ID,
  SAVE_TASK,
  UPDATE
} from "../types/tasksTypes";

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: "",
  userId: "",
  title: "",
  redirect: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: "",
        redirect: false
      };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, error: action.payload, loading: false };

    case CHANGE_USER_ID:
      return { ...state, userId: action.payload };

    case CHANGE_TITLE:
      return { ...state, title: action.payload };

    case SAVE_TASK:
      return {
        ...state,
        tasks: {},
        loading: false,
        error: "",
        redirect: true,
        title: "",
        userId: ""
      };
    case UPDATE:
      return {
        ...state,
        tasks: action.payload
      };

    default:
      return state;
  }
};
