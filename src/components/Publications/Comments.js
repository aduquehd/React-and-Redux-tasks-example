import React from "react";
import { connect } from "react-redux";
import Fatal from "../general/Fatal";
import Spinner from "../general/Spinner";

const Comments = props => {
  if (props.loadingCommentsError) {
    return <Fatal message={props.loadingCommentsError} />;
  }

  if (props.loadingComments && !props.comments.length) {
    return <Spinner />;
  }

  const showComments = () =>
    props.comments.map(comment => (
      <li>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        {comment.body}
      </li>
    ));

  return <ul>{showComments()}</ul>;
};

const mapStateToProps = ({ publicationsReducer }) => publicationsReducer;

export default connect(mapStateToProps)(Comments);
