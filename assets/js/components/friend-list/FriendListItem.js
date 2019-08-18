import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import Image from "react-bootstrap/Image";
// import thumbnail from "../../../static/images/thumbnail.jpg";
import FriendDetail from "./FriendDetail";

class FriendListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      showModal: !state.showModal
    }));
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
      <div className="FriendListItem" onClick={this.handleClick}>
        <div className="circleList">
          <Image
            className="circleImage"
            src={this.props.userPhoto}
            // src={this.props.userPhoto || thumbnail}
          />
        </div>
        <h6 className="user-name">{this.props.userName}</h6>
        {this.createMsg(this.props.status)}
        <FriendDetail
          user={this.props.user}
          closeModalButton={this.handleClick}
          showModal={this.state.showModal}
          uid={this.props.uid}
          userPhoto={this.props.userPhoto}
          userName={this.props.userName}
          userRallyID={this.props.rallyID}
          notify={this.props.notify}
        />
      </div>
    );
  }
}

export default FriendListItem;