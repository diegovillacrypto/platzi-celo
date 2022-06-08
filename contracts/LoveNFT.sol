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
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping (address=>uint256) public walletMints;

    constructor() payable ERC721("Love","LOVE") {
        mintPrice = 1.0 ether;
        totalSupply = 0;
        maxSupply = 100;
        maxPerWallet = 2; 
        withdrawWallet = payable(0x9983f247360deF7055579B1A9ec1682A70152F6D);
    }

    function setIsPublicMintEnable(bool isPublicMintEnable_) external onlyOwner {
        isPublicMintEnable = isPublicMintEnable_;
    }

    function SetBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;

    }

    function TokenUri(uint256 tokenId_) public view returns (string memory) {
        require(_exists(tokenId_), "token does not exist!");
        return string (abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner{
        (bool success, ) = withdrawWallet.call{value: address(this).balance} ("");
        require (success, "Withdraw failed");
    }

    function mint (uint256 quantity_) public payable{
        require (isPublicMintEnable, "Minting not enable");
        require (msg.value == quantity_ * mintPrice, "wrong mint value" );
        require (totalSupply + quantity_ <= maxSupply, "sold out");
        require (walletMints[msg.sender]+quantity_ <= maxSupply, "exceed max wallet");

        for (uint256 i=0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);

        }
    }
}