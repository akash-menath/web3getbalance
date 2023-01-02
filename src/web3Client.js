import Web3 from "web3";
let selectedAccount;
let xccerc20Contract;
let isInitialised =false

export const init = async () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    //metamask is installed
    provider
      .request({ method: "eth_requestAccounts" })
      .then((account) => {
        selectedAccount = account[0];
        console.log(`selected account ${selectedAccount}`);
      })
      .catch((err) => {
        console.log("error123", err);
        return;
      });

    window.ethereum.on("accountsChanged", function (account) {
      selectedAccount = account[0];
      console.log(`selected account is changed to ${selectedAccount}`);
    });
  }
  const web3 = await new Web3(provider);
  const networkId = await web3.eth.net.getId();
  console.log(networkId);

  const xccerc20Abi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
  ];
  

  xccerc20Contract = new web3.eth.Contract(
   xccerc20Abi,
    "0x8FCB1eC0135EA7b53C49B8dE3f2f7349cE6709c9"
  );
  console.log(111,xccerc20Contract);
  isInitialised=true
};



export const getOwnBlance=()=>{
    if(!isInitialised)init()
    return xccerc20Contract.methods.balanceOf(selectedAccount).call();
}
