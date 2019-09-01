import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../actions/usersActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";
import Table from "./Table";
// import usersReducer from "../../reducers/usersReducer";

class Users extends React.Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getAll();
    }
  }

  setContent = () => {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Fatal message={this.props.error} />;
    }

    return <Table />;
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.setContent()}
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usersReducer;
};

export default connect(
  mapStateToProps,
  userActions
)(Users);
