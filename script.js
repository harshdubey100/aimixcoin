let provider;
let signer;
let contract;
const contractABI = [
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
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "AddressBlocked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "blockAddress",
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
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Burn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Mint",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "unblockAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xfe33a40e0b0eA38df5850a8cDdD9863b9351cd4a"; // Replace with your contract address

// ✅ Connect to MetaMask and initialize ethers.js
async function connectWallet() {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
        console.log("Requesting MetaMask connection...");

        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Request accounts
        console.log("MetaMask connected!");

        signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("User Address:", userAddress);

        document.getElementById("userAddress").innerText = userAddress;

        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract successfully initialized:", contract);

        alert("Connected: " + userAddress);
    }


// ✅ Get Total Supply
async function getTotalSupply() {
    if (!contract) {
        alert("Please connect MetaMask first.");
        return;
    }

    try {
        const supply = await contract.totalSupply();
        document.getElementById("totalSupply").innerText = ethers.utils.formatEther(supply);
    } catch (error) {
        console.error("Error fetching total supply:", error);
        alert("Failed to fetch total supply.");
    }
}

// ✅ Transfer Tokens
async function transferTokens() {
    if (!contract) return alert("Connect to MetaMask first.");
    
    const recipient = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;
    
    if (!recipient || amount <= 0) {
        alert("Enter valid recipient address and amount.");
        return;
    }

    try {
        const tx = await contract.transfer(recipient, ethers.utils.parseEther(amount));
        await tx.wait(); // Wait for transaction confirmation
        alert("Transfer successful!");
        getTotalSupply();
    } catch (error) {
        console.error("Transfer failed:", error);
        alert("Transfer failed.");
    }
}

// ✅ Mint Tokens (Only Owner)
async function mintTokens() {
    if (!contract) return alert("Connect to MetaMask first.");

    try {
        const userAddress = await signer.getAddress();
        const tx = await contract.mint(userAddress, ethers.utils.parseEther("10"));
        await tx.wait();
        alert("Minted 10 AIMX!");
        getTotalSupply();
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed.");
    }
}

// ✅ Burn Tokens
async function burnTokens() {
    if (!contract) return alert("Connect to MetaMask first.");

    try {
        const tx = await contract.burn(ethers.utils.parseEther("10"));
        await tx.wait();
        alert("Burned 10 AIMX!");
        getTotalSupply();
    } catch (error) {
        console.error("Burning failed:", error);
        alert("Burning failed.");
    }
}

// ✅ Block Address (Only Owner)
async function blockAddress() {
    if (!contract) return alert("Connect to MetaMask first.");

    const address = document.getElementById("blockAddress").value;
    if (!address) return alert("Enter a valid address.");

    try {
        const tx = await contract.blockAddress(address);
        await tx.wait();
        alert("Address Blocked!");
    } catch (error) {
        console.error("Blocking failed:", error);
        alert("Blocking failed.");
    }
}

// ✅ Unblock Address (Only Owner)
async function unblockAddress() {
    if (!contract) return alert("Connect to MetaMask first.");

    const address = document.getElementById("blockAddress").value;
    if (!address) return alert("Enter a valid address.");

    try {
        const tx = await contract.unblockAddress(address);
        await tx.wait();
        alert("Address Unblocked!");
    } catch (error) {
        console.error("Unblocking failed:", error);
        alert("Unblocking failed.");
    }
}

function toggleMenu() {
    const menu = document.getElementById("contractMenu");
    menu.classList.toggle("hidden");
}

function copyContractAddress() {
    const contractAddress = document.getElementById("contractAddress").textContent;
    navigator.clipboard.writeText(contractAddress).then(() => {
        alert("Contract address copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

