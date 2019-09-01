import React, { Component } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import * as tasksActions from "../../actions/tasksActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

class Tasks extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tasks).length) {
      this.props.getAllTasks();
    }
  }

  componentDidUpdate() {
    const { loading, tasks, getAllTasks } = this.props;
    if (!Object.keys(tasks).length & !loading) {
      getAllTasks();
    }
  }

  showContent = () => {
    const { tasks, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal message={error} />;
    }

    return Object.keys(tasks).map(userId => (
      <div key={userId}>
        <h2>User: {userId}</h2>
        <div className="container_tasks">{this.showTasksByUser(userId)}</div>
      </div>
    ));
  };

  showTasksByUser = userId => {
    const { tasks, changeCheckbox, removeTask } = this.props;
    const userTasks = {
      ...tasks[userId]
    };
    return Object.keys(userTasks).map(taskId => (
      <div key={taskId}>
        <input
          type="checkbox"
          defaultChecked={userTasks[taskId].completed}
          onChange={() => changeCheckbox(userId, taskId)}
        />
        {userTasks[taskId].title}
        <button className="m_left">
          <Link to={`/tasks/new/${userId}/${taskId}`}>Edit</Link>
        </button>

        <button className="m_left" onClick={() => removeTask(taskId)}>
          Remove
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <button>
          <Link to="/tasks/new">New Task</Link>
        </button>
        {this.showContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
  mapStateToProps,
  tasksActions
)(Tasks);
