import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../../css/icons.css";

const Table = props => {
  const setRows = () =>
    props.users.map((user, key) => (
      <tr key={user.id}>
        <td>{key}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>
          <Link to={`/publications/${key}`}>
            <div className="eye-solid3 icon"></div>
          </Link>
        </td>
      </tr>
    ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>{setRows()}</tbody>
    </table>
  );
};

const mapStateToProps = reducers => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps)(Table);
