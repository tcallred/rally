import React, { Component } from "react";
import InputMoment from "input-moment";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
// import thumbnail from "../../../static/images/thumbnail.jpg";
import Image from "react-bootstrap/Image";
import MaterialIcon from "material-icons-react";
import Dropdown from "react-bootstrap/Dropdown";

class EventEditModal extends Component {
  constructor(props) {
    super(props);
    this.openStart = this.openStart.bind(this);
    this.closeStart = this.closeStart.bind(this);
    this.openEnd = this.openEnd.bind(this);
    this.closeEnd = this.closeEnd.bind(this);

    // Styling for dropdown buttons for color picker feature
    this.color1 = { backgroundColor: "#a21a1c" };
    this.color2 = { backgroundColor: "#007bff" };
    this.color3 = { backgroundColor: "#0d865a" };
    this.color4 = { backgroundColor: "#a6a124" };
    this.color5 = { backgroundColor: "#703f17" };
    this.color6 = { backgroundColor: "#474744" };
    this.color7 = { backgroundColor: "#4b1769" };
    this.color8 = { backgroundColor: "#964500" };

    this.state = {
      showStart: false,
      showEnd: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show === false) {
      this.setState({
        showStart: false,
        showEnd: false
      });
    }
  }

  openStart() {
    this.setState({
      showStart: true,
      showEnd: false
    });
  }

  closeStart() {
    this.setState({
      showStart: false
    });
  }

  openEnd() {
    this.setState({
      showEnd: true,
      showStart: false
    });
  }

  closeEnd() {
    this.setState({
      showEnd: false
    });
  }

  render() {
    let user = this.props.fireBaseUser;
    let friends = this.props.friendInfo;
    return (
      <div className="EventEditModal">
        {this.props.user === this.props.fireBaseUser.uid ? (
          // User clicking on their own events
          <Modal
            show={this.props.show}
            onHide={this.props.handleClose}
            dialogClassName={"custom-modal"}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit play time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="time-picking">
                <div>
                  <h3>Start time: </h3>
                  <input
                    className="time-display form-control"
                    type="text"
                    value={this.props.startTime.format("llll")}
                    readOnly
                    onClick={this.openStart}
                  />
                  {this.state.showStart ? (
                    <InputMoment
                      moment={this.props.startTime}
                      minStep={5}
                      onChange={this.props.onStartChange}
                      onSave={this.closeStart}
                    />
                  ) : null}
                </div>

                <br />
                <div>
                  <h3>End time: </h3>
                  <input
                    className="time-display form-control"
                    type="text"
                    value={this.props.endTime.format("llll")}
                    readOnly
                    onClick={this.openEnd}
                  />
                  {this.state.showEnd ? (
                    <InputMoment
                      moment={this.props.endTime}
                      minStep={5}
                      onChange={this.props.onEndChange}
                      onSave={this.closeEnd}
                    />
                  ) : null}
                </div>

                {/*Game title text box*/}

                <br />
                <Form>
                  <div>
                    <h3>Game title and description</h3>
                    <InputGroup>
                      <FormControl
                        as="textarea"
                        type="text"
                        className="gameTitleInput"
                        placeholder="Game Title, description, how many people you want in the party"
                        defaultValue={this.props.title}
                      />
                    </InputGroup>
                  </div>

                  {/*Party limit form*/}

                  <br />
                  <div>
                    <h3>Party Limit?</h3>
                    <InputGroup>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label># of friends</Form.Label>
                        <FormControl
                          defaultValue={this.props.partyLimit}
                          className="partyLimitNumFriends"
                        />
                      </Form.Group>
                    </InputGroup>
                  </div>

                  {/*Color button group for color picker feature*/}

                  <br />

                  <Dropdown title="Color" drop="right" id="colorDropDown">
                    <Dropdown.Toggle
                      className="colorButtonToggle"
                      style={{ backgroundColor: this.props.colorPickerColor }}
                      id="colorDropDownToggle"
                    >
                      Color
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="colorButtonMenu">
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color1)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color1} className="colorButton" /> Fire
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color2)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color2} className="colorButton" /> Aqua
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color3)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color3} className="colorButton" />{" "}
                        Grass
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color4)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color4} className="colorButton" />{" "}
                        Lemon
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color5)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color5} className="colorButton" />{" "}
                        Ground
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color6)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color6} className="colorButton" />{" "}
                        Metal
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color7)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color7} className="colorButton" />{" "}
                        Regal
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => this.props.setColorState(this.color8)}
                        className="colorButtonGroup"
                      >
                        <div style={this.color8} className="colorButton" />{" "}
                        Autumn
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/*Dynamically updated joined friends list group*/}

                  {this.props.joinedFriends.length > 0 ? (
                    <h3>Friends Joined</h3>
                  ) : null}
                  {this.props.joinedFriends.length > 0 ? (
                    <div>
                      <ListGroup className="joinedFriendsListGroup">
                        {this.props.joinedFriends.map(f => {
                          let selectedFriend = friends[f.id];

                          let photo = null;
                          if (selectedFriend !== undefined){
                            photo = selectedFriend['userPhoto']
                          } else if(f.id === user['uid']){
                            photo = user['photoURL']
                          }
                          return (
                            <FormLabel
                              key={f.id}
                              className="list-group-item-party"
                            >
                              <div className="friendListItemParty">
                                <h3>
                                  <Image
                                    className="thumbPartyList"
                                    roundedCircle
                                    src={photo}
                                    // src={photo || thumbnail}
                                  />
                                </h3>
                                <h6 className="userNamePartyList">
                                  {f.userName}
                                </h6>
                                <MaterialIcon
                                  onClick={() =>
                                    this.props.removeFriendFromParty(
                                      f.id,
                                      f.userName
                                    )
                                  }
                                  icon="highlight_off"
                                />
                              </div>
                            </FormLabel>
                          );
                        })}
                      </ListGroup>
                    </div>
                  ) : null}
                </Form>
              </div>
              <div className="modal-spacer" />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                className="delete-btn"
                onClick={this.props.handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="success"
                type="submit"
                onClick={this.props.handleSave}
              >
                Save
              </Button>
              <Button onClick={this.props.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        ) : (
          // User clicking on friends events
          <Modal
            show={this.props.show}
            onHide={this.props.handleClose}
            dialogClassName={"custom-modal"}
          >
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div>
                  <h3>Start time: </h3>
                  <FormLabel>{this.props.startTime.format("llll")}</FormLabel>
                </div>

                <br />
                <div>
                  <h3>End time: </h3>
                  <FormLabel>{this.props.endTime.format("llll")}</FormLabel>
                </div>

                <br />
                <Form>
                  <div>
                    <h3>Game title and description</h3>
                    <InputGroup>
                      <FormLabel>{this.props.title}</FormLabel>
                    </InputGroup>
                  </div>
                  <br />

                  {this.props.partyLimit > 0 ? (
                    <div>
                      <h3>Party Limit</h3>
                      <FormLabel>{this.props.partyLimit}</FormLabel>
                    </div>
                  ) : null}
                  <h3>Friends Joined</h3>
                  <div>
                    <ListGroup
                      variant="flush"
                      className="joinedFriendsListGroup"
                    >
                      {this.props.joinedFriends.map(f => {
                        let selectedFriend = friends[f.id];

                        let photo = null;
                        if (selectedFriend !== undefined){
                          photo = selectedFriend['userPhoto']
                        } else if(f.id === user['uid']){
                          photo = user['photoURL']
                        }

                        return (
                          <FormLabel
                            key={f.id}
                            className="list-group-item-party"
                          >
                            <div className="friendListItemParty">
                              <h3>
                                <Image
                                  className="thumbPartyList"
                                  roundedCircle
                                  src={photo}
                                  // src={ photo || thumbnail}
                                />
                              </h3>
                              <h6 className="userNamePartyList">
                                {f.userName}
                              </h6>
                            </div>
                          </FormLabel>
                        );
                      })}
                    </ListGroup>
                  </div>
                  {this.props.inEventParty ? (
                    <Button
                      className="joinLeaveButton"
                      variant="danger"
                      onClick={this.props.handleLeaveEvent}
                    >
                      Leave
                    </Button>
                  ) : (
                    <Button
                      className="joinLeaveButton"
                      onClick={this.props.handleJoinEvent}
                    >
                      Join?
                    </Button>
                  )}
                </Form>
              </div>
              <div className="modal-spacer" />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default EventEditModal;