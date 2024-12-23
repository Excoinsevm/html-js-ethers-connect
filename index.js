const { ethers } = require("ethers");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      document.getElementById("connectButton").innerHTML = "Connected";
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Connected accounts:", accounts);
    } catch (error) {
      console.log("Error connecting to MetaMask:", error);
    }
  } else {
    document.getElementById("connectButton").innerHTML = "Please install MetaMask";
  }
}

async function deployToken() {
  if (typeof window.ethereum !== "undefined") {
    const contractAddress = "0xd5b5A55826Bb31d2404c1A39E310083e72eEE3F8"; // Replace with actual TokensFactory contract address
    const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "deployer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "tokenName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "tokenSymbol",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalSupply",
                "type": "uint256"
            }
        ],
        "name": "TokenDeployed",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeploymentCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            }
        ],
        "name": "recoverERC20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "recoverNative",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "userinput_buy_liquidity_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userinput_buy_marketing_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userinput_sell_liquidity_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userinput_sell_marketing_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userinput_max_tx_percent",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userinput_max_wallet_percent",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "userinput_totalsupply",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "userinput_token_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userinput_token_symbol",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "userinput_marketingaddress",
                "type": "address"
            }
        ],
        "name": "deployToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDeployments",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "creators",
                "type": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferFactoryOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Replace these with the desired token parameters
    const buyLiquidityFee = 1; // e.g., 1%
    const buyMarketingFee = 2; // e.g., 2%
    const sellLiquidityFee = 1; // e.g., 1%
    const sellMarketingFee = 2; // e.g., 2%
    const maxTxPercent = 5; // e.g., 5%
    const maxWalletPercent = 10; // e.g., 10%
    const totalSupply = ethers.utils.parseUnits("1000000", 18); // 1,000,000 tokens (18 decimals)
    const tokenName = "MyToken";
    const tokenSymbol = "MTK";
    const marketingAddress = "0xYourMarketingWalletAddress"; // Replace with your marketing wallet address

    try {
      const tx = await contract.deployToken(
        buyLiquidityFee,
        buyMarketingFee,
        sellLiquidityFee,
        sellMarketingFee,
        maxTxPercent,
        maxWalletPercent,
        totalSupply,
        tokenName,
        tokenSymbol,
        marketingAddress
      );
      console.log("Transaction sent, waiting for confirmation...");
      const receipt = await tx.wait();
      console.log("Token deployed! Transaction receipt:", receipt);
    } catch (error) {
      console.log("Error deploying token:", error);
    }
  } else {
    document.getElementById("executeButton").innerHTML = "Please install MetaMask";
  }
}

module.exports = {
  connect,
  deployToken,
};
