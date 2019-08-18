import React, { Component } from "react";
import FriendListItem from "./FriendListItem";
import UserListItem from "./UserListItem";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import moment from "moment";
import AddFriendModal from "./AddFriendModal";

class FriendList extends Component {
  /* Determines the status for a user out of: PLAYING NOW, PLAYING TODAY, PLAYING THIS WEEK, or NOT PLAYING*
      Object returned in format {code: <now, today, this-week, not-playing>, start: TIME, end: TIME}
    */

  computePlayingStatus(events, friend) {
    let todayStart = moment()
      .startOf("day")
      .toDate();
    let todayEnd = moment()
      .endOf("day")
      .toDate();
    let weekEnd = moment()
      .endOf("week")
      .toDate();
    let now = new Date();

    let found = events.find(e => {
      return e.start > todayStart && e.end > now && e.user === friend;
    });

    if (found && found.start < now && found.end > now) {
      return { code: "now", start: found.start, end: found.end };
    } else if (found && found.start > now && found.start < todayEnd) {
      return { code: "today", start: found.start, end: found.end };
    } else if (found && found.start > now && found.start < weekEnd) {
      return { code: "this-week", start: found.start, end: found.end };
    } else {
      return { code: "not-playing", start: null, end: null };
    }
  }

  render() {
    // Compute playing status initially
    this.props.friendInfo.forEach(f => {
      f.status = this.computePlayingStatus(
        this.props.events,
        f.id,
        this.props.user.uid
      );
    });
    return (
      <div className="FriendList">
        <h3>Me</h3>
        <ListGroup>
          <ListGroupItem className="list-group-item">
            <UserListItem
              status={this.computePlayingStatus(
                this.props.events,
                this.props.user.uid,
                this.props.user.uid
              )}
              user={this.props.user}
            />
          </ListGroupItem>
        </ListGroup>

        <h3>Friends</h3>
        <ListGroup>
          {this.props.friendInfo
            .sort((a, b) => {
              let codePrecedence = {
                now: 0,
                today: 1,
                "this-week": 2,
                "not-playing": 10
              };
              return (
                codePrecedence[a.status.code] - codePrecedence[b.status.code]
              );
            })
            .map(f => {
              return (
                <ListGroupItem key={f.id} className="list-group-item">
                  <FriendListItem
                    uid={f.id}
                    status={f.status}
                    rallyID={f.rallyID}
                    notify={f.notify}
                    userEmail={f.userEmail}
                    userName={f.userName}
                    userPhoto={f.userPhoto}
                    user={this.props.user}
                  />
                </ListGroupItem>
              );
            })}
        </ListGroup>
        <AddFriendModal user={this.props.user} />
      </div>
    );
  }
}

export default FriendList;