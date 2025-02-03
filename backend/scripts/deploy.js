const hre = require("hardhat");

async function main() {
    const AddressBook = await hre.ethers.getContractFactory("AddressBook");

    console.log("Deploying AddressBook...");
    const addressBook = await AddressBook.deploy();

    await addressBook.waitForDeployment();

    console.log("AddressBook deployed to", await addressBook.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })