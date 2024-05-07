//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract IMS {
    address public owner;

    // Struct for items in inventory
    struct Item {
        uint itemId;
        string itemName;
        uint quantity;
        uint price;
        address manufacturer;
    }

    // Struct for manufacturer
    struct Manufacturer {
        string name;
        mapping(uint => Item) inventory;
        uint itemCount;
    }

    // Struct for distributor
    struct Distributor {
        string name;
        mapping(uint => Item) availableItems;
        uint itemCount;
    }

    mapping(address => Manufacturer) public manufacturers;
    mapping(address => Distributor) public distributors;
    mapping(address => bool) public isManufacturer;
    mapping(address => bool) public isDistributor;
    address[] public registeredManufacturers;

    // Events
    event ManufacturerRegistered(address indexed manufacturer, string name);
    event DistributorRegistered(address indexed distributor, string name);
    event ItemAdded(address indexed manufacturer, uint indexed itemId, string itemName, uint quantity, uint price);
    event ItemEdited(address indexed manufacturer, uint indexed itemId, string itemName, uint quantity, uint price);
    event ItemPurchased(address indexed distributor, address indexed manufacturer, uint indexed itemId, uint quantity);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict access
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Manufacturer functions
    function registerManufacturer(string memory _name) external {
        require(!isManufacturer[msg.sender], "Manufacturer is already registered");
        manufacturers[msg.sender].name = _name;
        isManufacturer[msg.sender] = true;
        registeredManufacturers.push(msg.sender);
        emit ManufacturerRegistered(msg.sender, _name);
    }

    function addItem(uint _itemId, string memory _itemName, uint _quantity, uint _price) external {
        require(isManufacturer[msg.sender], "Only registered manufacturers can add items");
        require(_itemId > 0 && _quantity > 0 && _price > 0, "Invalid item details");
        require(manufacturers[msg.sender].inventory[_itemId].itemId == 0, "Item ID already exists");

        manufacturers[msg.sender].inventory[_itemId] = Item(_itemId, _itemName, _quantity, _price, msg.sender);
        manufacturers[msg.sender].itemCount++;
        emit ItemAdded(msg.sender, _itemId, _itemName, _quantity, _price);
    }

    function editItem(uint _itemId, string memory _itemName, uint _quantity, uint _price) external {
        require(isManufacturer[msg.sender], "Only registered manufacturers can edit items");
        require(manufacturers[msg.sender].inventory[_itemId].itemId != 0, "Item does not exist");
        manufacturers[msg.sender].inventory[_itemId].itemName = _itemName;
        manufacturers[msg.sender].inventory[_itemId].quantity = _quantity;
        manufacturers[msg.sender].inventory[_itemId].price = _price;
        emit ItemEdited(msg.sender, _itemId, _itemName, _quantity, _price);
    }

    // Distributor functions
    function registerDistributor(string memory _name) external {
        require(!isDistributor[msg.sender], "Distributor is already registered");
        distributors[msg.sender].name = _name;
        isDistributor[msg.sender] = true;
        emit DistributorRegistered(msg.sender, _name);
    }

    function getAvailableItems() external view returns (Item[] memory) {
        uint totalCount;
        for (uint i = 0; i < registeredManufacturers.length; i++) {
            address manufacturerAddr = registeredManufacturers[i];
            totalCount += manufacturers[manufacturerAddr].itemCount;
        }

        Item[] memory items = new Item[](totalCount);
        uint currentIndex = 0;
        for (uint i = 0; i < registeredManufacturers.length; i++) {
            address manufacturerAddr = registeredManufacturers[i];
            Manufacturer storage manufacturer = manufacturers[manufacturerAddr];
            for (uint j = 1; j <= manufacturer.itemCount; j++) {
                Item storage item = manufacturer.inventory[j];
                items[currentIndex] = item;
                currentIndex++;
            }
        }
        return items;
    }

    function purchaseItem(address _manufacturer, uint _itemId, uint _quantity) external payable {
        require(isDistributor[msg.sender], "Only registered distributors can purchase items");
        require(distributors[msg.sender].availableItems[_itemId].itemId == 0, "Item ID already exists for the distributor");

        Item storage item = manufacturers[_manufacturer].inventory[_itemId];
        require(item.itemId != 0, "Item does not exist");
        require(item.quantity >= _quantity, "Not enough quantity available");
        require(msg.value >= (item.price * _quantity), "Insufficient funds");

        // Transfer funds to manufacturer
        payable(_manufacturer).transfer(msg.value);

        // Update quantity in manufacturer's inventory
        item.quantity -= _quantity;

        // Add item to distributor's available items
        distributors[msg.sender].availableItems[_itemId] = item;
        distributors[msg.sender].itemCount++;

        emit ItemPurchased(msg.sender, _manufacturer, _itemId, _quantity);
    }

    // Retrieve manufacturer items
    function getManufacturerItems(address _manufacturer) external view returns (Item[] memory) {
        require(isManufacturer[_manufacturer], "Not a registered manufacturer");
        Manufacturer storage manufacturer = manufacturers[_manufacturer];
        Item[] memory items = new Item[](manufacturer.itemCount);
        for (uint i = 1; i <= manufacturer.itemCount; i++) {
            items[i - 1] = manufacturer.inventory[i];
        }
        return items;
    }

    // Retrieve distributor available items
    function getDistributorItems() external view returns (Item[] memory) {
        require(isDistributor[msg.sender], "Not a registered distributor");
        Distributor storage distributor = distributors[msg.sender];
        Item[] memory items = new Item[](distributor.itemCount);
        for (uint i = 1; i <= distributor.itemCount; i++) {
            items[i - 1] = distributor.availableItems[i];
        }
        return items;
    }
}
