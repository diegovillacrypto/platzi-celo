require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
const dotenv = require("dotenv")
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    "version": "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }  
    },
    namedAccounts: {
      deployer: 0
    },  
  }, 
  networks: {
    Alfajores_TestNet: {
      url: "https://alfajores-forno.celo-testnet.org",
      chainId: 44787,
      accounts: [process.env.PRIVATE_KEY] // viene de la configuración de la billetera
    }  
  },
  etherscan:{
    apiKey: process.env.SCAN_API_KEY
  }
};
