import { ethers } from 'ethers';
import contractABI from './InventoryManagementSystem.json';

const contractAddress = '0xdc2700fC359F1c9a341dCF3156Fe22839378C7d3';

class InventoryManagementService {
    constructor(props) {
        super(props);
        this.inventoryService = new InventoryManagementService();
        // rest of the constructor code
      }

  initializeContract = async () => {
    try {
      const [currentUser] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.currentUser = currentUser;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      this.contract = new ethers.Contract(contractAddress, contractABI, signer);
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  };

  registerManufacturer = async (manufacturerName) => {
    try {
      const tx = await this.contract.registerManufacturer(manufacturerName, { from: this.currentUser });
      await tx.wait();
      console.log('Manufacturer registered successfully!');
    } catch (error) {
      console.error('Error registering manufacturer:', error);
    }
  };

  // Add other contract function implementations here
  
  proceedServiceRequest = async (requestId, nonacademicId) => {
    try {
      const tx = await this.contract.proceedServiceRequest(requestId, nonacademicId, { from: this.currentUser });
      await tx.wait();
      console.log('Service request proceeded successfully!');
    } catch (error) {
      console.error('Error proceeding service request:', error);
      throw error;
    }
  };

  onSubmit = async () => {
    try {
      const { staffReq, nonacademicId } = this.state;
      await this.inventoryService.proceedServiceRequest(staffReq.requestId, nonacademicId);
      this.updateRequest(staffReq.requestId);
      this.setState({ submitted: true });
    } catch (error) {
      console.error('Error proceeding service request:', error);
    }
  };
}



export default InventoryManagementService;