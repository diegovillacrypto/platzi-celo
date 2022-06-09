import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import loveNFT from "./LoveNFT.json";

const loveNFTAddress = "0x90aB661B2C33d4890C468a9ed6fc485Eb19B63F8";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                loveNFTAddress, 
                loveNFT.abi,
                signer
                );
            
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther(( 1 * mintAmount).toString()),
                });
                console.log("response", response );
            } catch (err) {
                console.log("error", err);
            }
        }
    }
    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };
    const handleIncrement = () => {
      if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);  
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
            <div>
            <Text fontSize="48px">LoveNFT</Text>
            <Text
             fontSize="30px"
             letterSpacing="-5.5%"
             fontFamily="readex+pro"
             /*textShadow="0 2px 2px #000000" */  >
                    Donaciones no fungibles para ayudar, apoyar e impactar de manera positiva a miles de personas.
            </Text>
            </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                        backgroundColor="#ff4000"
                        borderRadius="6px"
                        boxShadow="0px 2px 2px 1px #000000"
                        color="white"
                        cursor="pointer"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleDecrement}>-</Button>
                        <Input 
                        readOnly
                        fontFamily="readex+pro"
                        width="100px"
                        height="40px"
                        textAlign="center"
                        paddingLeft="19px"
                        marginTop="10px"
                        type="number" 
                        value={mintAmount}/>

                        <Button 
                        backgroundColor="#4dff4d"
                        borderRadius="6px"
                        boxShadow="0px 2px 2px 1px #000000"
                        color="white"
                        cursor="pointer"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleIncrement}>+</Button>

                    </Flex>
                    <Button
                    backgroundColor="#000000"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #000000"
                    color="white"
                    cursor="pointer"
                    padding="15px"
                    marginTop="10px"
                    onClick={handleMint}>Mint LOVE</Button>

                </div>
            ): (

                <Text
                marginTop="70px"
                fontSize="30px"
                letterSpacing="-5.5%"
                fontFamily="readex+pro"
                /*textShadow="0 2px 2px #000000"*/
                color="#ffffff"
                >No estas conectado a CELO</Text>

            )}
            </Box>
        </Flex>
    );        
}

export default MainMint;