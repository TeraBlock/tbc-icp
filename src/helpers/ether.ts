import { ethers } from "ethers";
const rpcUrl = "https://rpc.ankr.com/bsc";
const provider = new ethers.JsonRpcProvider(rpcUrl);
const eventPollingInterval = 3000;
const bridgeAddress = "0x80705283D1E2CaA3fB126f1262aeC6C260C7c205";

export const getLatestBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const getLockEvents = async (fromBlock: number, toBlock: number) => {
  //TODO: Add ABI
  const contract = new ethers.Contract(bridgeAddress, [], provider);

  const filter = contract.filters["Lock"]();
  const allLockEvents = [];
  for (let i = fromBlock; i <= toBlock; i += eventPollingInterval) {
    const events = await contract.queryFilter(
      filter,
      i,
      i + eventPollingInterval
    );
    if (events.length > 0) {
      allLockEvents.push(...events);
    }
  }
  return allLockEvents;
};
