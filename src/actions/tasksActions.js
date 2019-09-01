import axios from "axios";

import {
  GET_ALL_TASKS,
  LOADING,
  ERROR,
  CHANGE_TITLE,
  CHANGE_USER_ID,
  SAVE_TASK,
  UPDATE
} from "../types/tasksTypes";

export const getAllTasks = () => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tasks = {};

    response.data.map(
      task =>
        (tasks[task.userId] = {
          ...tasks[task.userId],
          [task.id]: {
            ...task
          }
        })
    );

    dispatch({
      type: GET_ALL_TASKS,
      payload: tasks
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: "Tasks information is not available!"
    });
  }
};

export const changeUserId = userId => dispatch => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: userId
  });
};

export const changeTitle = title => dispatch => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  });
};

export const addNewTask = newtask => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.post(
      "http://jsonplaceholder.typicode.com/todos",
      newtask
    );

    dispatch({
      type: SAVE_TASK
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: "Can't create a new task"
    });
  }
};

export const editTask = editedTask => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.put(
      `http://jsonplaceholder.typicode.com/todos/${editedTask.id}`,
      editedTask
    );

    dispatch({
      type: SAVE_TASK
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: "Can't create a new task"
    });
  }
};

export const changeCheckbox = (userId, taskId) => (dispatch, getState) => {
  const { tasks } = getState().tasksReducer;
  const selected = tasks[userId][taskId];

  const updatedTasks = {
    ...tasks
  };

  updatedTasks[userId] = {
    ...tasks[userId]
  };

  updatedTasks[userId][taskId] = {
    ...tasks[userId][taskId],
    completed: !selected.completed
  };

  dispatch({
    type: UPDATE,
    payload: updatedTasks
  });
};

export const removeTask = taskId => async dispatch => {
  dispatch({
    type: LOADING
  });

  try {
    const response = await axios.put(
      `http://jsonplaceholder.typicode.com/todos/${taskId}`
    );

    dispatch({
      type: GET_ALL_TASKS,
      payload: {}
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: `Can't remove the task with ID: ${taskId}`
    });
  }
};
