// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AddressBook {

    struct Book{
        uint id;
        string name;
        string contactAddress;
        string phoneNumber;
        address owner;
    }

    mapping (address => mapping (uint => Book)) public addressBook;
    mapping (address => uint) public addressCount;

    event newAddressAdded (uint id, string name, string contractAddress, string phoneNumber);

    //Function to add new Address
    function addAddress(string memory _name, string memory _contractAddress, string memory _phoneNumber) public {
        uint _id = addressCount[msg.sender] + 1;
        Book memory newBook = Book(_id, _name, _contractAddress, _phoneNumber, msg.sender);

        addressBook[msg.sender][_id] = newBook;

        addressCount[msg.sender] = _id;
    }

    //Function to get Address
    function getAddress () public view returns ( Book [] memory) {
        uint totalAddress = addressCount[msg.sender];

        Book[] memory books = new Book[](totalAddress);

        for(uint i = 1; i <= totalAddress; i++) {
            books[i - 1] = addressBook[msg.sender][i];
        }
        return books;
    }
}
