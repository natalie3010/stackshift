import React from "react";

export default function Home() {

  const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
const web3 = new Web3(`https://alfajores-forno.celo-testnet.org`);
const kit = ContractKit.newKitFromWeb3(web3);

// **---------- ✅ Set account variables--------------** //

// Update private key to the account you would like to use (do not share with others)
const PRIVATE_KEY =
"0xbf16dfbc0e7505986ae63e19a27bd631bccc4a1d5ea14fa70420a94e66aa192c";
const GUEST_PRIVATE_KEY = "0xc010dfbc3acd55b8e25113773b363c7abe8642a58d4e4c8b3a4d586b3eab8ce8";
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
const accountGuest = web3.eth.accounts.privateKeyToAccount(GUEST_PRIVATE_KEY);
// Update address to the address of the account you want to interact with
let address = '0xf601795eb62962841348521713ED5cc4E3EF8ddd';
// Set amount for transfer related functions
let value = ".0001";

//  Connect to the network

kit.connection.addAccount(account.privateKey);
kit.defaultAccount = account.address;

// #######################################################
// ################## Read Functions  ####################
// #######################################################

// **--------------- ✅ Name ---------------** //

/**
 * @return The name of the CELO token.
 */



async function name() {
  let contract = await kit.contracts.getGoldToken();
  let tryname = await contract.name();
  console.log(`${tryname}`);
}

let testMe = name();

// #######################################################
// ################ Account Functions ####################
// #######################################################

// **----------------- ✅ Balance Of -----------------** //

/**
 * @notice Gets the balance of the specified address.
 * @param owner The address to query the balance of.
 * @return The balance of the specified address.
 */

async function balanceOf() {
  let contract = await kit.contracts.getGoldToken();
  let balanceOf = await contract.balanceOf(account.address);
  console.log(`${balanceOf}`);
}
// ********************************************************************************** //
// balanceOf();

  // /**
  //  * @notice Transfers CELO from one address to another on behalf of a user.
  //  * @param from The address to transfer CELO from.
  //  * @param to The address to transfer CELO to.
  //  * @param value The amount of CELO to transfer.
  //  * @return True if the transaction succeeds.
  //  */

  // async function transferFrom() {
  //   let amount = kit.web3.utils.toWei(value, "ether");
  //   let contract = await kit.contracts.getGoldToken();
  //   let transaction = await contract.
  //   transferFrom(account.address, accountGuest.address, amount)
  //   .send({ from: account.address })
  //   ;
  //   console.log(`${balanceOf}`);

  //   let balance = await contract.balanceOf(account.address);
  //   let balance2 = await contract.balanceOf(accountGuest.address);
  
  //   console.log(
  //     //`Transaction: https://alfajores-blockscout.celo-testnet.org/tx/${receipt.transactionHash}/`,
  //   "\n",
  //     `Balance: ${kit.web3.utils.fromWei(balance.toString(), "ether")}`,
  //     `Balance2: ${kit.web3.utils.fromWei(balance2.toString(), "ether")}`)
  // }

  // ******************************************************************************************** //

// **----------------- ✅ Transfer -------------------** //

/**
 * @notice Transfers CELO from one address to another.
 * @param to The address to transfer CELO to.
 * @param value The amount of CELO to transfer.
 * @return True if the transaction succeeds.
 */


async function transfer() {
  let amount = kit.web3.utils.toWei(value, "ether");
  let contract = await kit.contracts.getGoldToken();
  let transaction = await contract
    .transfer(address, amount)
    .send({ from: account.address })
    ;
  let receipt = await transaction.waitReceipt();
  let balance = await contract.balanceOf(account.address);

  console.log(
    `Transaction: https://alfajores-blockscout.celo-testnet.org/tx/${receipt.transactionHash}/`,
    "\n",
    `Balance: ${kit.web3.utils.fromWei(balance.toString(), "ether")}`
  );
}

  
  
  return (
    <div>

      <div className="h1">There you go... a canvas for your next Celo project!</div>

    
      <div> 
        <p> enter bill amount </p>
        <input/>
      </div>

      <div> 

        <p> How would you like to split the bill? </p>
        <div>
          <button type="button">Equally </button>
        </div>

        <div>
          <button>60:40 </button>
        </div>
        
        
        <button>70:30 </button>
        <button onClick={transfer}>test me</button>
      </div>
      
    </div>
  )
}
