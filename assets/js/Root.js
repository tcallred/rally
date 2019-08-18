import React, {Component} from 'react';
import '../css/app.css';
import FriendList from './components/friend-list/FriendList'
import CalendarView from "./components/calendar-view/CalendarView";
import TitleBar from "./components/title-bar/TitleBar";
import _ from 'lodash/array'
import {Button} from "react-bootstrap";

class App extends Component {
   constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);

      this.state = {
         events: [],
         friends: [],
         user: {
            emailVerified: true
         }
      };

   }

   componentDidMount() {

   }

   login() {

   }

   logout() {

   }

   componentWillMount() {

   }

   handleChange(e) {
      this.setState({
         events: e
      });
   }

   render() {
      return (
         <div className="App">
            <TitleBar user={this.state.user} login={this.login} logout={this.logout}/>
            {this.state.user &&
            <div className='Main-Area'>
               <FriendList events={this.state.events} friendList={this.state.friends}
                           user={this.state.user}/>
               <CalendarView onChange={this.handleChange} events={this.state.events}
                             user={this.state.user}/>
            </div>}
            {!this.state.user &&
            <div className='Main-Area'>
               <div className='friend-placeholder'>
               </div>
               <div className='calendar-placeholder'>
                  <h2>Login to get started</h2>
                  <Button bsSize='large' bsStyle='primary' onClick={this.login}>Login</Button>
               </div>
            </div>}
         </div>
      );
   }
}

export default App;