import Web3 from "web3";
import contractABI from "./contractABI";

let web3;
let myContract;
let account;

const initializeWeb3 = async () => {
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        myContract = new web3.eth.Contract(contractABI, contractAddress);
        try{
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if(accounts.length === 0) {
              console.alert("No account found! Please connect your wallet");
            }
            account = accounts[0];
          }catch{
            console.log("No account found");
          }
    }
    else{
        window.alert("Please install Metamask or any other Ethereum Wallet");
    }
}



//function for adding address

const addAddress = async (name, contactAddress, phoneNumber) => {
    try {
        const response = await myContract.methods.addAddress(name, contactAddress, phoneNumber).send({from: account});
        console.log("Address added", response);
        
    }catch(error) {
        console.error(error);
    }
}

//function for loading address
const getAddress = async () => {
    try {
        if (!account) {
            try{
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if(accounts.length === 0) {
                  console.alert("No account found! Please connect your wallet");
                }
                account = accounts[0];
              }catch{
                console.log("No account found");
              }
            
        }
       
        const addressList =  await myContract.methods.getAddress().call({from: account});
    
        console.log("address List", addressList);

        const formatedAddress = addressList.map((address) =>(
            {
                addressId: address[0],
                addresName: address[1],
                contactAddress: address[2],
                phoneNumber: address[3],
            }
        ));

        console.log("Formatted Address", formatedAddress);

        return formatedAddress;
    }catch(error) {
        console.error(error);
    }
}

initializeWeb3();
export {addAddress, getAddress};
