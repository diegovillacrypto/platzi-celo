// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract LoveNFT is ERC721, Ownable {

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnable;
    address payable public withdrawWallet;
    mapping (address=>uint256) public walletMints;

    constructor() payable ERC721("Love","LOVE") {
        mintPrice = 1.0 ether;
        totalSupply = 0;
        maxSupply = 100;
        maxPerWallet = 3; 
        withdrawWallet = payable(0x651E2E2C0b713624004A983E8137ee2535C7CBe8);
    }

    function setIsPublicMintEnable(bool isPublicMintEnable_) external onlyOwner {
        isPublicMintEnable = isPublicMintEnable_;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmakhwNCjaLKsvkQyugXrndJhwNhKprDa3XohkPof8ya7k/";
    }

    function withdraw() external onlyOwner{
        (bool success, ) = withdrawWallet.call{value: address(this).balance} ("");
        require (success, "Withdraw failed");
    }

    function mint (uint256 quantity_) public payable{
        require (isPublicMintEnable, "Minting not enable");
        require (msg.value == quantity_ * mintPrice, "wrong mint value" );
        require (totalSupply + quantity_ <= maxSupply, "sold out");
        require (walletMints[msg.sender]+quantity_ < maxSupply, "exceed max wallet");
        walletMints[msg.sender] += quantity_; 

        for (uint256 i=0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);

        }
    }
}