import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

class AcceptFriendRequestModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      invitesPending: false,
      show: false,
      friendInvites: [],
      numFriendInvites: 0
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleFriendAccept(friendUid, rallyid, friendEmail) {
    
  }

  handleFriendDecline(friendUid) {
    
  }

  componentWillMount() {
   
  }

  render() {
    return (
      <>
        <Button
          onClick={this.handleShow}
          variant={this.state.invitesPending ? "success" : "secondary"}>
          Friend Invites
          <Badge variant="light">{this.state.numFriendInvites}</Badge>
        </Button>
        <Modal
          dialogClassName="custom-modal"
          show={this.state.show}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Accept Friend Requests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.invitesPending ? (
              <ListGroup>
                {this.state.friendInvites.sort().map(f => {
                  return (
                    <ListGroupItem key={f.uid}>
                      {f.rallyID}
                      <Button
                        onClick={() =>
                          this.handleFriendAccept(
                            f.uid,
                            f.rallyID,
                            f.userEmail,
                            f.userName,
                            f.userPhoto
                          )
                        }>
                        Accept
                      </Button>
                      <Button
                        onClick={() =>
                          this.handleFriendDecline(f.uid, f.rallyID)
                        }
                        variant="secondary">
                        Decline
                      </Button>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            ) : null}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AcceptFriendRequestModal;