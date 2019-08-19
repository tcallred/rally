import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarHeading from "./CalendarHeading";
import EventEditModal from "./EventEditModal";
import uuid from "uuid";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
// import thumbnail from "../../../static/images/thumbnail.jpg";

const localizer = BigCalendar.momentLocalizer(moment);

class CalendarView extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEventSelect = this.handleEventSelect.bind(this);
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
    this.handleLeaveEvent = this.handleLeaveEvent.bind(this);
    this.removeFriendFromParty = this.removeFriendFromParty.bind(this);
    this.setColorState = this.setColorState.bind(this);
    this.ChangeEventStyle = this.ChangeEventStyle.bind(this);

    this.state = {
      show: false,
      currentlyEditingID: 0,
      startTime: moment().add(30 - (moment().minute() % 30), "minutes"),
      endTime: moment()
        .add(30 - (moment().minute() % 30), "minutes")
        .add(1, "hours"),
      title: "",
      user: "",
      partyLimit: 0,
      joinedFriends: [],
      inEventParty: false,
      colorPickerColor: "#007bff"
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleSave() {
    
  }

  handleDelete() {
  
  }

  // Handler for when the user presses the add event button
  handleAddEventButton() {
    let today = new Date();

    let newEvent = {
      start: today,
      end: today,
      user: this.props.user.uid,
      title: "",
      eventID: uuid()
    };

    this.setState({
      startTime: moment(newEvent.start),
      endTime: moment(newEvent.end.setHours(newEvent.end.getHours() + 2)),
      show: true,
      currentlyEditingID: newEvent.eventID,
      title: newEvent.title,
      user: newEvent.user,
      partyLimit: 0,
      joinedFriends: [],
      colorPickerColor: "#007bff"
    });
  };

  // Handler for when the user drags a range on the calender
  handleSelect({ start, end }) {
    let newEvent = {
      start: start,
      end: end,
      user: this.props.user.uid,
      title: "",
      eventID: uuid()
    };

    let addEvent = newEvent;
    addEvent.start = addEvent.start.getTime();
    addEvent.end = addEvent.end.getTime();



    this.setState({
      startTime: moment(start),
      endTime: moment(end),
      show: true,
      currentlyEditingID: newEvent.eventID,
      title: newEvent.title,
      user: newEvent.user,
      partyLimit: 0,
      joinedFriends: [],
      colorPickerColor: "#007bff"
    });
  };

  // Handles user clicking an event.
  handleEventSelect(event) {
   
  };

  handleJoinEvent() {
   
  }

  handleLeaveEvent() {
    
  }

  removeFriendFromParty(friend, friendUserName) {
    
  }

  setColorState(color) {
    this.setState({
      colorPickerColor: color.backgroundColor
    });
  }

  ChangeEventStyleMonth({ event }) {
    return (
      <span>
        {GrabUserName()}: {event.title}
      </span>
    );

    function GrabUserName() {
      let userName = "";
      return <strong>{userName}</strong>;
    }
  }

  ChangeEventStyle({ event }) {
    let friends = this.props.friendInfo;
    let user = this.props.user;
    let photoArray = [];
    // Grab friend photos for each event

    // Parse user photo
    function grabUserPhoto() {
      let userPhoto = "";
      let userName = "";
      
      return (
        <div className="calendarUserDetailsContainer">
          <div className="circleList">
            {/* <Image className="circleImage" src={userPhoto || thumbnail} /> */}
          </div>
          <strong>{userName}</strong>
        </div>
      );
    }

    // Parse friend photos
    function grabFriendPhotos() {
      let listOfPhotos = [];
      for (let i = 0; i < photoArray.length; i++) {
          listOfPhotos.push(
              <div className="circleList" key={i}>
                <Image
                    className="circleImage"
                    src={photoArray[i]|| thumbnail}
                />
              </div>
          );
      }
      return listOfPhotos;
    }

    return (
      <div>
        {grabUserPhoto()}&nbsp;&nbsp;{event.title}
        {grabFriendPhotos().length > 0 ? <p>Friends Joined: </p> : null}
        <div className="joinedFriendsPhotoContainer">{grabFriendPhotos()}</div>
      </div>
    );
  }

  changeColor(event) {
    let color = "#007bff";
    
    return {
      style: {
        backgroundColor: color
      }
    };
  };

  render() {
    let {startTime, endTime, title, user, joinedFriends, inEventParty, show, partyLimit, colorPickerColor, ...state} = this.state;
    let {friendInfo, events, ...props} = this.props;
    let fireBaseUser = props.user;
    let eventID = state.currentlyEditingID;

    let bigCalendarProps = {
      localizer,
      defaultDate: new Date(),
      defaultView: "week",
      events,
      scrollToTime: moment().endOf("day").toDate(),
      eventPropGetter: this.changeColor,
      onSelectSlot: this.handleSelect,
      onSelectEvent: this.handleEventSelect,
      components: {
        agenda: {
          event: this.ChangeEventStyle
        },
        week: {
          event: this.ChangeEventStyle
        },
        day: {
          event: this.ChangeEventStyle
        },
        month: {
          event: this.ChangeEventStyleMonth
        }
      },
    };

    let eventEditModalProps = {
      className: "EventEditModal",
      onStartChange: d => {
        this.setState({startTime: d});
        if (this.state.startTime > this.state.endTime) {
          let newTime = moment(d.add(1, "hours"));
          this.setState({endTime: newTime});
        }
      },
      onEndChange: d => {
        this.setState({endTime: d});
        if (this.state.startTime > this.state.endTime) {
          let newTime = moment(d.subtract(1, "hours"));
          this.setState({startTime: newTime});
        }
      },
      startTime,
      endTime,
      title,
      user,
      friendInfo,
      fireBaseUser,
      joinedFriends,
      inEventParty,
      show,
      eventID,
      partyLimit,
      colorPickerColor,
      setColorState: this.setColorState,
      handleClose: this.handleClose,
      handleSave: this.handleSave,
      handleDelete: this.handleDelete,
      handleJoinEvent: this.handleJoinEvent,
      handleLeaveEvent: this.handleLeaveEvent,
      removeFriendFromParty: this.removeFriendFromParty,
    };

    return (
      <div className="Calendar">
        <CalendarHeading addEvent={this.handleAddEventButton} />
        <BigCalendar className="BigCalendar" selectable showMultiDayTimes {...bigCalendarProps}/>
        <EventEditModal {...eventEditModalProps}/>
      </div>
    );
  }
}

export default CalendarView;