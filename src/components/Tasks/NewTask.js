import React, { Component } from "react";
import { connect } from "react-redux";

import * as tasksActions from "../../actions/tasksActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

import { Redirect } from "react-router-dom";

class NewTask extends Component {
  componentDidMount() {
    const {
      match: {
        params: { currentUserId, currentTaskId }
      },
      tasks,
      changeUserId,
      changeTitle
    } = this.props;

    if (currentUserId && currentTaskId) {
      const task = tasks[currentUserId][currentTaskId];
      changeUserId(task.userId);
      changeTitle(task.title);
    } else {
      changeUserId("");
      changeTitle("");
    }
  }

  changeUserId = event => {
    this.props.changeUserId(event.target.value);
  };
  changeTitle = event => {
    this.props.changeTitle(event.target.value);
  };

  save = () => {
    const {
      userId,
      title,
      tasks,
      match: {
        params: { currentUserId, currentTaskId }
      },
      addNewTask,
      editTask
    } = this.props;

    const newTask = {
      userId,
      title,
      completed: false
    };

    if (currentTaskId && currentTaskId) {
      const task = tasks[currentUserId][currentTaskId];

      const editedTask = {
        ...newTask,
        completed: task.completed,
        id: task.id
      };
      editTask(editedTask);
    } else {
      addNewTask(newTask);
    }
  };

  isDisabled = () => {
    const { userId, title, loading } = this.props;
    if (loading) {
      return true;
    }

    if (!userId || !title) {
      return true;
    }

    return false;
  };

  showAction = () => {
    const { loading, error } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal message={error} />;
    }
  };

  render() {
    return (
      <div>
        {this.props.redirect ? <Redirect to="/tasks" /> : ""}
        <h1>Save task</h1>
        User Id:
        <input
          type="number"
          value={this.props.userId}
          onChange={this.changeUserId}
        />
        <br />
        <br />
        Title:
        <input
          type="text"
          value={this.props.title}
          onChange={this.changeTitle}
        />
        <br />
        <br />
        <button onClick={this.save} disabled={this.isDisabled()}>
          Save
        </button>
        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
  mapStateToProps,
  tasksActions
)(NewTask);
