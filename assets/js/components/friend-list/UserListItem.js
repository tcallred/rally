import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import Image from "react-bootstrap/Image";
// import thumbnail from "../../../static/images/thumbnail.jpg";
import UserDetail from "./UserDetail";

class UserListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  createMsg(status) {
    let labelMsg;
    switch (status.code) {
      case "same-time":
        labelMsg = (
          <Badge variant="success">Playing at the same time as you!</Badge>
        );
        break;
      case "now":
        labelMsg = (
          <Badge variant="success">
            Playing now (Done {moment(status.end).fromNow()})
          </Badge>
        );
        break;
      case "today":
        labelMsg = (
          <Badge variant="primary">
            Playing today @ {moment(status.start).format("hh:mm a")}
          </Badge>
        );
        break;
      case "this-week":
        labelMsg = (
          <Badge variant="warning">
            Playing this {moment(status.end).format("dddd")}
          </Badge>
        );
        break;
      case "not-playing":
        labelMsg = <Badge variant="secondary">Not playing</Badge>;
        break;
      default:
        break;
    }
    return labelMsg;
  }

  render() {
    return (
      <div>
        <div className="FriendListItem" onClick={this.showModal}>
          <div className="circleList">
            <Image
              className="circleImage"
              src={this.props.user.photoURL}
              // src={this.props.user.photoURL || thumbnail}
            />
          </div>
          <h6 className="user-name">{this.props.user.displayName}</h6>
          {this.createMsg(this.props.status)}
        </div>
        <UserDetail
          closeModal={this.closeModal}
          showModal={this.state.showModal}
          user={this.props.user}
        />
      </div>
    );
  }
}

export default UserListItem;