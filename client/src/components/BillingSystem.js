
import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ItemReqService from "../services/academic-item-req.service";
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default class BillingSystem extends Component {
    constructor(props) {
        super(props);
        this.getRequests = this.getRequests.bind(this);
        this.renderTableIssued = this.renderTableIssued.bind(this);
        this.generateBill = this.generateBill.bind(this);

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

    generateBill(request) {
        const { requestId, academicId, item_no, quantity, reason } = request;
        ItemReqService.getItemDetails(item_no)
            .then((response) => {
                const item = response.data;
                const price = item.price;
                const totalAmount = price * quantity;
    
                const doc = new jsPDF();
    
                // Add logo directly using URL
                const logoUrl = 'client\src\navbar-logo-blue.png';
                doc.addImage(logoUrl, 'PNG', 10, 10, 50, 50);
    
                // Add company name and address
                doc.setFontSize(16);
                doc.text('Your Company Name', 10, 70);
                doc.setFontSize(12);
                doc.text('123 Street, City, Country', 10, 80);
                doc.text('Phone: +1 123 456 7890', 10, 90);
                doc.text('Email: info@yourcompany.com', 10, 100);
    
                // Add bill details
                doc.setFontSize(18);
                doc.text('Bill for Request ID: ' + requestId, 10, 120);
                doc.setFontSize(12);
                doc.text('Name: ' + academicId, 10, 130);
                doc.text('Item: ' + item.item_name, 10, 140);
                doc.text('Quantity: ' + quantity, 10, 150);
                doc.text('Price per unit: Rs. ' + price.toFixed(2), 10, 160);
                doc.text('Total Amount: Rs. ' + totalAmount.toFixed(2), 10, 170);
    
                // Add thank you message
                doc.setFontSize(14);
                doc.text('Thank you for your business!', 10, 190);
    
                doc.save("bill_request_" + requestId + ".pdf");
            })
            .catch((error) => {
                console.log(error);
                this.setState({ error: "An error occurred while generating the bill. Please try again." });
            });
    }
    

    generateBill(request) {
        const { requestId, academicId, item_no, quantity, reason } = request;
        // Fetch item details based on item_no
        ItemReqService.getItemDetails(item_no)
            .then((response) => {
                const item = response.data;
                console.log("Item details:", item); // Debugging statement
                const price = item.price;
                const totalAmount = price * quantity;
                // Create a new jsPDF instance
                const doc = new jsPDF();
                // Add content to the PDF
                doc.setFontSize(18);
                doc.text("Bill for Request ID: " + requestId, 10, 20);
                doc.setFontSize(12);
                doc.text("Name: " + academicId, 10, 30);
                doc.text("Item: " + item.item_name, 10, 40);
                doc.text("Quantity: " + quantity, 10, 50);
                doc.text("Price per unit: Rs. " + price + "/-", 10, 60);
                doc.text("Total Amount: Rs. " + totalAmount + "/-", 10, 70);
                // Save the PDF
                doc.save("bill_request_" + requestId + ".pdf");
                console.log("PDF generated and saved"); // Debugging statement
            })
            .catch((e) => {
                console.log("Error fetching item details:", e); // Debugging statement
            });
    }

    renderTableIssued() {
        return this.state.staffReq.map((request, index) => {
            if (request.isIssued) {
                const { requestId, academicId, item_no, quantity, reason } = request //destructuring
                return (
                    <tr key={requestId}>
                        <td>{academicId}</td>
                        <td>{item_no}</td>
                        <td>{quantity}</td>
                        <td>{reason}</td>
                        <td>
                        
<button
                        type="button"
                        className="btn btn-info"
                        onClick={() => this.generateBill(request)} >
                        Download Bills
                      </button>

                            
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
                <h4>Bills</h4>
                <hr />
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="reviewed" role="tabpanel" aria-labelledby="reviewed-tab">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Download Bill</th>
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