
const hre = require("hardhat");

async function main() {

  const LoveNFT = await hre.ethers.getContractFactory("LoveNFT");
  const loveNFT = await LoveNFT.deploy();

  await loveNFT.deployed();

  console.log("LoveNFT deployed to:", loveNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
