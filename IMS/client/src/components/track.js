    import React, { Component } from "react";
    import AuthService from "../services/auth.service";
    import ItemReqService from "../services/academic-item-req.service";


    import { Link } from 'react-router-dom';

    export default class track extends Component {
        constructor(props) {
            super(props);
            this.getRequests = this.getRequests.bind(this);
        // this.renderTablePending = this.renderTablePending.bind(this);
            this.renderTableIssued = this.renderTableIssued.bind(this);

            this.state = {
                staffReq: [],
                currentUser: "",
                pending: 0
            };
        }

        componentDidMount() {
            this.setState({
                currentUser: AuthService.getCurrentUser().username
            });
            this.getRequests();
        }

        getRequests() {
            ItemReqService.getall()
                .then((response) => {
                    this.setState({
                        staffReq: response.data,
                    });
                    console.log(this.state.staffReq);
                })
                .catch((e) => {
                    console.log(e);
                });
        }



        renderTableIssued() {
            return this.state.staffReq.map((request, index) => {
                if (request.isIssued) {
                    const { requestId, academicId, item_no, quantity,reason, requestedTime,status } = request //destructuring
                    return (
                        <tr key={requestId}>
                            <td>{academicId}</td>
                            <td>{item_no}</td>
                            <td>{quantity}</td>
                            <td>{reason}</td>
                            <td>{requestedTime}</td>
                            <td>{status}</td>
                            <td>
    <Link 
        to={`/update-status/${requestId}`}
        className="btn btn-info"
        style={{
            display: 'inline-block',
            padding: '6px 12px',
            textDecoration: 'none',
            borderRadius: '4px',
            backgroundColor: '#261d74',
            color: 'white',
            border: '1px solid #261d74',
            cursor: 'pointer',
            transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
        }}
    >
        Update Status
    </Link>
</td>

                            
                        </tr >
                    )
                    
                }
                else { return null; }
            })
        }

        render() {
            return (
                <div className="container">
                    <h4>Update Tracking</h4>
                    <hr />
                    {/*<ul className="nav nav-pills mb-3" id="myTab" role="tablist">
                    
                        <li className="nav-item">
                            <a className="nav-link active" id="reviewed-tab" data-toggle="tab" href="#reviewed" role="tab" aria-controls="reviewed" aria-selected="true">Orders</a>
                        </li>
            </ul>*/}
                    <div className="tab-content" id="myTabContent">
                        
                        <div className="tab-pane fade show active" id="reviewed" role="tabpanel" aria-labelledby="reviewed-tab">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Reason</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableIssued()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }