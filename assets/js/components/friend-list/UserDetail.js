import React, { Component } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import Image from "react-bootstrap/es/Image";
// import thumbnail from "../../../static/images/thumbnail.jpg";
// import UploadPhotoModal from "./UploadPhotoModal";
import UserSettingsModal from "./UserSettingsModal";

class UserDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModalPhoto: false,
      showModalSettings: false,
      opacity: 1
    };

    this.flipModalStatePhotoModal = this.flipModalStatePhotoModal.bind(this);
    this.flipModalStateSettingsModal = this.flipModalStateSettingsModal.bind(
      this
    );
  }

  flipModalStatePhotoModal() {
    this.setState(state => ({
      showModalPhoto: !state.showModalPhoto,
      opacity: this.state.showModalPhoto ? 1 : 0
    }));
  }

  flipModalStateSettingsModal() {
    this.setState(state => ({
      showModalSettings: !state.showModalSettings,
      opacity: this.state.showModalSettings ? 1 : 0
    }));
  }

  preventClose() {}

  render() {
    return (
      <div>
        <Modal
          style={{ opacity: this.state.opacity }}
          enforceFocus={false}
          className="UserDetail"
          show={this.props.showModal}
          dialogClassName={"custom-modal"}
          onHide={this.preventClose}
        >
          <Modal.Body>
            <div className="userNamePhotoContainer">
              <div className="photoContainer">
                <div className="circle">
                  <Image
                    className="userPhoto"
                    onClick={this.flipModalStatePhotoModal}
                    src={this.props.photoURL}
                    // src={this.props.user.photoURL || thumbnail}
                  />
                </div>
                <p>change photo</p>
              </div>
              <h2 className="userNameUserDetail">
                {this.props.user.displayName}
              </h2>
            </div>
            <h3>
              Rally ID:{" "}
              <Badge varient="primary">{this.props.user.rallyID}</Badge>
            </h3>
          </Modal.Body>
          <Modal.Footer>
            <UserSettingsModal
              flipModalState={this.flipModalStateSettingsModal}
              showModal={this.state.showModalSettings}
              user={this.props.user}
            />
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* <UploadPhotoModal
          user={this.props.user}
          closeModal={this.flipModalStatePhotoModal}
          showModal={this.state.showModalPhoto}
        /> */}
      </div>
    );
  }
}

export default UserDetail;