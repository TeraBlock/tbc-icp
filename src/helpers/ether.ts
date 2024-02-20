// import { ethers } from "ethers";
// import { lockEvents } from "../watcher";

// export const getLatestBlockNumber = async () => {
//   const rpcUrl = "https://rpc.ankr.com/bsc";
//   const provider = new ethers.JsonRpcProvider(rpcUrl);
//   const blockNumber = await provider.getBlockNumber();
//   return blockNumber;
// };

// export const getLockEvents = async (fromBlock: number, toBlock: number) => {
//   const rpcUrl = "https://rpc.ankr.com/bsc";
//   const provider = new ethers.JsonRpcProvider(rpcUrl);
//   const eventPollingInterval = 3000;
//   const bridgeAddress = "0x80705283D1E2CaA3fB126f1262aeC6C260C7c205";
  
//   //TODO: Add ABI
//   const contract = new ethers.Contract(bridgeAddress, [], provider);

//   const filter = contract.filters["Lock"]();

//   for (let i = fromBlock; i <= toBlock; i += eventPollingInterval) {
//     const events = await contract.queryFilter(
//       filter,
//       i,
//       i + eventPollingInterval
//     );
//     if (events.length > 0) {
//       events.forEach((event) => {
//         lockEvents.push(JSON.stringify(event));
//       });
//     }
//   }
//   // return allLockEvents;
// };
