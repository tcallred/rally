import React, { Component } from "react";
import "react-datetime/css/react-datetime.css";
import "input-moment/dist/input-moment.css";
import Button from "react-bootstrap/es/Button";

class CalendarHeading extends Component {
  render() {
    return (
      <div className="CalendarHeading">
        <h2>Play times</h2>
        <div className="addBtnArea">
          <Button variant="success" onClick={this.props.addEvent}>
            {" "}
            Add event +
          </Button>
        </div>
      </div>
    );
  }
}

export default CalendarHeading;