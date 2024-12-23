const { ethers } = require("ethers");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      document.getElementById("connectButton").innerHTML = "Connected";
      console.log("Wallet connected");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    document.getElementById("connectButton").innerHTML = "Please install MetaMask";
  }
}

async function execute() {
  if (typeof window.ethereum !== "undefined") {
    // Get the user inputs from the form
    const tokenName = document.getElementById("tokenName").value;
    const tokenSymbol = document.getElementById("tokenSymbol").value;
    const buyLiquidityFee = parseInt(document.getElementById("buyLiquidityFee").value);
    const buyMarketingFee = parseInt(document.getElementById("buyMarketingFee").value);
    const sellLiquidityFee = parseInt(document.getElementById("sellLiquidityFee").value);
    const sellMarketingFee = parseInt(document.getElementById("sellMarketingFee").value);
    const maxTxPercent = parseInt(document.getElementById("maxTxPercent").value);
    const maxWalletPercent = parseInt(document.getElementById("maxWalletPercent").value);
    const totalSupply = ethers.utils.parseUnits(
      document.getElementById("totalSupply").value,
      18
    );
    const marketingAddress = document.getElementById("marketingAddress").value;

    // Replace with your TokensFactory contract address
    const contractAddress = "0xd5b5A55826Bb31d2404c1A39E310083e72eEE3F8";
    
    // TokensFactory ABI
    const abi = [
      {
        inputs: [
          { internalType: "uint256", name: "userinput_buy_liquidity_fee", type: "uint256" },
          { internalType: "uint256", name: "userinput_buy_marketing_fee", type: "uint256" },
          { internalType: "uint256", name: "userinput_sell_liquidity_fee", type: "uint256" },
          { internalType: "uint256", name: "userinput_sell_marketing_fee", type: "uint256" },
          { internalType: "uint256", name: "userinput_max_tx_percent", type: "uint256" },
          { internalType: "uint256", name: "userinput_max_wallet_percent", type: "uint256" },
          { internalType: "uint256", name: "userinput_totalsupply", type: "uint256" },
          { internalType: "string", name: "userinput_token_name", type: "string" },
          { internalType: "string", name: "userinput_token_symbol", type: "string" },
          { internalType: "address", name: "userinput_marketingaddress", type: "address" },
        ],
        name: "deployToken",
        outputs: [{ internalType: "address", name: "tokenAddress", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log("Deploying token...");
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
        marketingAddress,
        { gasLimit: 3000000 } // Optional: adjust gas limit if needed
      );

      console.log("Transaction sent, waiting for confirmation...");
      const receipt = await tx.wait();
      console.log("Token deployed! Receipt:", receipt);

      alert(`Token successfully deployed at address: ${receipt.events[0].args.tokenAddress}`);
    } catch (error) {
      console.error("Error deploying token:", error);
      alert("Failed to deploy token. Check the console for more details.");
    }
  } else {
    alert("Please install MetaMask");
  }
}

module.exports = {
  connect,
  execute,
};
