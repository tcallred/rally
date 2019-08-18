import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

class AddFriendModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForFriendAlreadyFriends = this.checkForFriendAlreadyFriends.bind(
      this
    );

    this.state = {
      show: false,
      rallyUID: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  checkForFriendAlreadyFriends() {
    
  }

  handleSubmit() {
    
  }

  render() {
    return (
      <>
        <Button
          className="addFriendBtn"
          variant="primary"
          size="sm"
          onClick={this.handleShow}
        >
          Add friend +
        </Button>

        <Modal
          dialogClassName="custom-modal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Send Friend Invite</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Row>
                <Form.Group as={Col} md="8">
                  <Form.Control
                    required
                    type="text"
                    placeholder="User Name"
                    className="userNameInput"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        -
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      placeholder="#####"
                      aria-describedby="inputGroupPrepend"
                      required
                      className="rallyIdInput"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Form>
            <p>
              "Ask your friend for their RallyID or send this RallyID: <br />
              <strong>{this.props.user.rallyID}</strong> to your friend so they
              can add you."
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={this.checkForFriendAlreadyFriends}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddFriendModal;