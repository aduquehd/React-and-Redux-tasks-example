import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

import * as userActions from "../../actions/usersActions";
import * as publicationsActions from "../../actions/publicationsActions";
import Comments from "./Comments";

const { getAll: getAllUsers } = userActions;
const { getUserPublications, openClose, getComments } = publicationsActions;

class Publications extends Component {
  async componentDidMount() {
    const {
      getAllUsers,
      getUserPublications,
      match: {
        params: { key }
      }
    } = this.props;

    if (!this.props.usersReducer.users.length) {
      await getAllUsers();
    }

    if (this.props.usersReducer.error) {
      return;
    }

    if (!("publicationsKey" in this.props.usersReducer.users[key])) {
      getUserPublications(key);
    }
  }

  showUser = () => {
    const {
      usersReducer,
      match: {
        params: { key }
      }
    } = this.props;

    if (usersReducer.error) {
      return <Fatal message={usersReducer.error} />;
    }

    if (!usersReducer.users.length || usersReducer.loading) {
      return <Spinner />;
    }

    const name = usersReducer.users[key].name;

    return <h1>{name}'s Publications</h1>;
  };

  showPublications = () => {
    const {
      usersReducer,
      usersReducer: { users },
      publicationsReducer,
      publicationsReducer: { publications },
      match: {
        params: { key }
      }
    } = this.props;

    if (!users.length) return;
    if (usersReducer.error) return;

    if (publicationsReducer.loading) {
      return <Spinner />;
    }

    if (publicationsReducer.error) {
      return <Fatal message={publicationsReducer.error} />;
    }

    if (!publications.length) return;

    if (!("publicationsKey" in users[key])) return;

    const { publicationsKey } = users[key];

    return this.showInfo(publications[publicationsKey], publicationsKey);
  };

  showInfo = (publications, publicationKey) =>
    publications.map((publication, commentKey) => (
      <div
        className="publications-title"
        key={publication.id}
        onClick={() =>
          this.showComments(publicationKey, commentKey, publication.comments)
        }
      >
        <h2>{publication.title}</h2>
        <h4>{publication.body}</h4>
        {publication.open ? (
          <Comments comments={publication.comments} />
        ) : (
          "Closed"
        )}
      </div>
    ));

  showComments = (publicationKey, commentKey, comments) => {
    this.props.openClose(publicationKey, commentKey);
    if (!comments.length) {
      this.props.getComments(publicationKey, commentKey);
    }
  };

  render() {
    return (
      <div>
        {this.props.match.params.key}
        {this.showUser()}
        {this.showPublications()}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return {
    usersReducer,
    publicationsReducer
  };
};

const mapDispatchToProps = {
  getAllUsers,
  getUserPublications,
  openClose,
  getComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Publications);
