// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract InventoryManagementSystem {
    address public manufacturer;
    mapping(address => uint256) public distributorBalances;
    enum PurchaseStatus { Pending, Accepted, Rejected }

    struct Purchase {
        address distributor;
        uint256 quantity;
        PurchaseStatus status;
    }

    Purchase[] public purchases;

    event PurchaseRequest(address indexed distributor, uint256 quantity);
    event PurchaseAccepted(uint256 indexed purchaseId);
    event PurchaseRejected(uint256 indexed purchaseId);

    constructor() {
        manufacturer = msg.sender;
    }

    modifier onlyManufacturer() {
        require(msg.sender == manufacturer, "Only manufacturer can call this function");
        _;
    }

    function makePurchaseRequest(uint256 _quantity) external {
        require(_quantity > 0, "Quantity should be greater than zero");
        distributorBalances[msg.sender] += _quantity;
        purchases.push(Purchase(msg.sender, _quantity, PurchaseStatus.Pending));
        emit PurchaseRequest(msg.sender, _quantity);
    }

    function acceptPurchaseRequest(uint256 _purchaseId) external onlyManufacturer {
        require(_purchaseId < purchases.length, "Invalid purchase id");
        require(purchases[_purchaseId].status == PurchaseStatus.Pending, "Purcdhase already processe");

        purchases[_purchaseId].status = PurchaseStatus.Accepted;
        emit PurchaseAccepted(_purchaseId);
    }

    function rejectPurchaseRequest(uint256 _purchaseId) external onlyManufacturer {
        require(_purchaseId < purchases.length, "Invalid purchase id");
        require(purchases[_purchaseId].status == PurchaseStatus.Pending, "Purchase already processed");

        purchases[_purchaseId].status = PurchaseStatus.Rejected;
        distributorBalances[purchases[_purchaseId].distributor] -= purchases[_purchaseId].quantity;
        emit PurchaseRejected(_purchaseId);
    }
}
