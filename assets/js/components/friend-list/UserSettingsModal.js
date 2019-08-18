import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

class UserSettingsModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.saveSettings = this.saveSettings.bind(this);
        this.showSaveSettings = this.showSaveSettings.bind(this);
        this.showDeleteOldEvents = this.showDeleteOldEvents.bind(this);
        this.showDeleteAllEvents = this.showDeleteAllEvents.bind(this);
        this.saveSettingsDatabaseCall = this.saveSettingsDatabaseCall.bind(this);
        this.deleteAllEventsDatabaseCall = this.deleteAllEventsDatabaseCall.bind(this);
        this.deleteOldEventsDatabaseCall = this.deleteOldEventsDatabaseCall.bind(this);

        this.state = {
            showSaveModal: false,
            showOldEventsModal: false,
            showDeleteEventsModal: false,
            opacity: 1
        };
    }

    showDeleteOldEvents() {
        this.setState(state => ({
            showOldEventsModal: !state.showOldEventsModal,
            opacity: this.state.showOldEventsModal ? 1 : 0
        }));
    }

    showDeleteAllEvents() {
        this.setState(state => ({
            showDeleteEventsModal: !state.showDeleteEventsModal,
            opacity: this.state.showDeleteEventsModal ? 1 : 0
        }));
    }

    showSaveSettings() {
        this.setState(state => ({
            showSaveModal: !state.showSaveModal,
            opacity: this.state.showSaveModal ? 1 : 0
        }));
    }

    deleteAllEventsDatabaseCall(){
        this.showDeleteAllEvents()
    }

    deleteOldEventsDatabaseCall(){
        this.showDeleteOldEvents()
    }

    saveSettingsDatabaseCall(username, uid, rallyIDBefore) {
        if (
            username === "" ||
            username === this.props.user.displayName ||
            username.length < 3
        ) {
            alert(
                "username cannot be nothing, your current username, or less than 3 characters in length"
            );
        } else {
            let rallyID = generateRallyID();
        }

        function generateRallyID() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (let i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            let rallyID = `-${text}`;

            return rallyID;
        }
    }

    deleteOldEvents(show){
        return (
            <div>
                <Modal backdrop={false} show={show} size="small">
                    <Modal.Body>
                        Are you sure you want to delete events before now?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            varient="danger"
                            className="delete-btn"
                            onClick={this.deleteOldEventsDatabaseCall}>Yes</Button>
                        <Button onClick={this.showDeleteOldEvents}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };

    deleteAllEvents(show){
        return (
            <div>
                <Modal backdrop={false} show={show} size="small">
                    <Modal.Body>
                        Are you sure you want to delete all events?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            varient="danger"
                            className="delete-btn"
                            onClick={this.deleteAllEventsDatabaseCall}>Yes</Button>
                        <Button onClick={this.showDeleteAllEvents}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };

    saveSettings(show){
        let changedUserName;

        if (show === true) {
            changedUserName = document.querySelector(".changeUserNameControl").value;
        }

        return (
            <div className="SaveSettingsModalContainer">
                <Modal backdrop={false} show={show} className="SaveSettingsModal">
                    <Modal.Header>
                        <h2>Settings being changed:</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="changeUserNameContainer">
                            <strong>User Name:</strong> <p>{changedUserName}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            className="delete-btn"
                            onClick={() =>
                                this.saveSettingsDatabaseCall(
                                    changedUserName,
                                    this.props.user.uid,
                                    this.props.user.rallyID
                                )
                            }
                        >
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.showSaveSettings}>
                            Back
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };

    render() {
        return (
            <div>
                <Button
                    variant="secondary"
                    className="delete-btn"
                    onClick={this.props.flipModalState}
                >
                    Settings
                </Button>
                <Modal
                    style={{opacity: this.state.opacity}}
                    backdrop={false}
                    show={this.props.showModal}
                    className="UserSettingsModal"
                >
                    <Modal.Header>
                        <h2>Change User Info:</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="changeUserNameContainer">
                                <strong>Current username:</strong>{" "}
                                <p>{this.props.user.displayName}</p>
                            </div>
                            <Form.Control
                                placeholder="New username"
                                className="changeUserNameControl"/>
                            <br/>
                        </Form>
                        <div className="deleteOldAllEventsContainer">
                            <Button variant={"secondary"} onClick={this.showDeleteOldEvents}>Delete Old Events</Button>
                            <Button variant={"danger"} onClick={this.showDeleteAllEvents}>Delete All Events</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className="delete-btn"
                            onClick={this.showSaveSettings}>Next</Button>
                        <Button variant="secondary" onClick={this.props.flipModalState}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {this.saveSettings(this.state.showSaveModal)}
                {this.deleteOldEvents(this.state.showOldEventsModal)}
                {this.deleteAllEvents(this.state.showDeleteEventsModal)}
            </div>
        );
    }
}

export default UserSettingsModal;