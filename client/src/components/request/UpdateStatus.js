import React, { Component } from "react";
import AcaItemReqService from '../../services/academic-item-req.service';

export default class UpdateStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '',
      status: '',
      message: ''
    };
  }

  componentDidMount() {
    const { requestId } = this.props.match.params;
    if (requestId) {
      this.setState({ requestId }, () => {
        this.fetchRequestDetails();
      });
    }
  }

  fetchRequestDetails = () => {
    const { requestId } = this.state;
    AcaItemReqService.get(requestId)
      .then(response => {
        const { status } = response.data;
        this.setState({ status });
      })
      .catch(error => {
        console.error("Error fetching request details:", error);
      });
  };

  handleStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };

  updateStatus = () => {
    const { requestId, status } = this.state;
    AcaItemReqService.updateStatus(requestId, status)
      .then(response => {
        this.setState({ message: "Status updated successfully!" });
      })
      .catch(error => {
        console.error("Error updating status:", error);
        this.setState({ message: "An error occurred while updating the status." });
      });
  };

  render() {
    const { status, message } = this.state;
    return (
      <div className="container">
        <div className="edit-form">
          <h4>Update Item Status</h4>
          <form>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={this.handleStatusChange}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Issued">Issued</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.updateStatus}
            >
              Update Status
            </button>
          </form>
          {message && <div className="alert alert-info mt-2">{message}</div>}
        </div>
      </div>
    );
  }
}
