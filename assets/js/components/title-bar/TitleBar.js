import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AcceptFriendRequestModal from "./AcceptFriendRequestModal";

class TitleBar extends Component {
  render() {
    return (
      <div className="TitleBar">
          <div>
            <h1 className="title">rally </h1>
            <h5 className="subtitle">Coordinate game time with friends</h5>
          </div>

        <div className="titleBarBtns">
          {this.props.user.emailVerified ? (
            <AcceptFriendRequestModal user={this.props.user} />
          ) : null}
          {this.props.user ? (
            <Button size="large" onClick={this.props.logout}>
              Logout
            </Button>
          ) : (
            <Button size="large" onClick={this.props.login}>
              Login
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default TitleBar;