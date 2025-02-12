// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AiMixcoin {
    string public name = "AiMixcoin";
    string public symbol = "AIMX";
    uint8 public decimals = 18;  // Recommended standard

    uint256 public totalSupply = 100 * 10**uint256(decimals);
    address public owner;

    mapping(address => uint256) private balances;
    mapping(address => bool) private isBlocked;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);
    event AddressBlocked(address indexed account, bool status);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender; 
        balances[owner] = totalSupply; 
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) external returns (bool) {
        require(!isBlocked[msg.sender], "Your address is blocked.");
        require(!isBlocked[recipient], "Recipient address is blocked.");
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        require(recipient != address(0), "Invalid recipient address.");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address.");
        require(!isBlocked[to], "Address is blocked.");

        totalSupply += amount;
        balances[to] += amount;

        emit Mint(to, amount);
        emit Transfer(address(0), to, amount);
    }

    function burn(uint256 amount) external {
        require(!isBlocked[msg.sender], "Your address is blocked.");
        require(balances[msg.sender] >= amount, "Insufficient balance to burn.");

        balances[msg.sender] -= amount;
        totalSupply -= amount;

        emit Burn(msg.sender, amount);
        emit Transfer(msg.sender, address(0), amount);
    }

    function renounceOwnership() external onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }

    function blockAddress(address account) external onlyOwner {
        require(account != owner, "Cannot block the owner.");
        isBlocked[account] = true;
        emit AddressBlocked(account, true);
    }

    function unblockAddress(address account) external onlyOwner {
        isBlocked[account] = false;
        emit AddressBlocked(account, false);
    }
}
