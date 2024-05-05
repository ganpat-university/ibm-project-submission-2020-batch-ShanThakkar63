import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import ProfileService from '../services/profile.service';
import ItemReviewService from '../services/review-item-req.service';

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      currentProfile: {},
      totalRequests: 0,
    };
  }

  componentDidMount() {
    this.fetchTotalRequests();
    const { currentUser } = this.state;
    if (currentUser) {
      this.getUserProfile(currentUser.username);
    }
  }

  fetchTotalRequests() {
    // Ideally, your backend should provide an endpoint that returns the total number of pending requests.
    // If not, you might need to get all requests and filter them on the frontend, which is not efficient.
    // For example purposes, we'll use `getPending` method you might have to implement.
    ItemReviewService.getPending()
      .then(response => {
        // Assuming the response contains an array of pending requests
        this.setState({ totalRequests: response.data.length });
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });
  }

  getUserProfile(username) {
    ProfileService.get(username)
      .then(response => {
        this.setState({ currentProfile: response.data });
      })
      .catch(error => {
        console.error('Error getting user profile:', error);
      });
  }

  render() {
    const { currentUser, currentProfile, totalRequests } = this.state;

    return (
      <div className="container">
        {/* Display welcome message and total requests */}
        <h3>Welcome, {currentProfile.first_name || currentUser.username}</h3>
        <div>Total Pending Requests: {totalRequests}</div>

        {/* The rest of your UI components go here */}
        {/* ... */}
      </div>
    );
  }
}
