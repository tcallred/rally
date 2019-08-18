import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteFriendModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.showModal = this.showModal.bind(this);
    this.deleteFriendAction = this.deleteFriendAction.bind(this);

    this.state = {
      showModal: false
    };
  }

  showModal() {
    this.setState(state => ({
      showModal: !state.showModal
    }));
  }

  deleteFriendAction() {
    
  }

  render() {
    return (
      <div>
        <Button
          variant="danger"
          className="delete-btn"
          onClick={this.showModal}
        >
          Un-friend
        </Button>
        <Modal show={this.state.showModal} size="small">
          <Modal.Body>
            Are you sure you want to delete {this.props.friendName}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              varient="danger"
              className="delete-btn"
              onClick={this.deleteFriendAction}
            >
              Yes
            </Button>
            <Button onClick={this.showModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteFriendModal;