import React, { Component } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import Image from "react-bootstrap/es/Image";
// import thumbnail from "../../../static/images/thumbnail.jpg";
import DeleteFriendModal from "./DeleteFriendModal.js";
import Switch from "react-switch";

class FriendDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  showHideActions() {}

  handleChange(checked) {
    this.setState({ checked });
  }

  preventClose(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div onClick={this.preventClose}>
        <Modal
          className="FriendDetail"
          show={this.props.showModal}
          dialogClassName={"custom-modal"}
          onHide={this.showHideActions}
        >
          <Modal.Body>
            <div className="friendDetailInformationContainer">
              <div className="circleList">
                <Image
                  className="circleImage"
                  src={this.props.userPhoto}
                  // src={this.props.userPhoto || thumbnail}
                />
              </div>
              <h2>{this.props.userName}</h2>
            </div>
            <h3>
              Rally ID:{" "}
              <Badge varient="primary">{this.props.userRallyID}</Badge>
            </h3>

            <div className="notificationsContainer">
              <Switch
                onChange={this.handleChange}
                checked={this.props.notify}
              />
              <p>notification on created event</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.closeModalButton()}>Close</Button>
            {!this.props.user ? null : (
              <DeleteFriendModal
                user={this.props.user}
                uid={this.props.uid}
                friendName={this.props.userName}
                rallyID={this.props.rallyID}
              />
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FriendDetail;