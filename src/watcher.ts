import {
  update,
  query,
  int,
  Record,
  text,
  blob,
  AzleText,
  nat64,
  nat32,
  ic,
  Principal,
} from "azle";
import { signMessage } from "./utils";
import { isAuthorized, listAuthorizedPrincipals } from "./auth";
import { caller } from "azle/src/lib/ic/caller";
import {
  getLatestBlockNumber,
  getLockEvents as getLogs,
} from "./helpers/ether";

let lockEvents: text[] = [];
let Signature: blob[] = [];

// save synced Block number
let syncedBlockNumber: number = 31644347; // block number of the bridge deployment BSC

// Function to process and store lock events
export const processLockEvent = update([text], text, async (event: text) => {
  const callerPrincipal = caller();
  if (!isAuthorized(callerPrincipal)) {
    ic.trap("Unauthorized access");
  }
  // Generate a nonce
  const nonce = generateNonce();

  // code to scan Lock Events with ethersjs and store in MongoDB
  const toBlockNumber = await getLatestBlockNumber();
  const lockEvents = await getLogs(syncedBlockNumber, toBlockNumber);
  // send lock events to a URL
  //  await call(); // use this if canister
  await fetch("http://localhost:3000/lockEvents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lockEvents),
  });

  // update syncedBlockNumber
  syncedBlockNumber = toBlockNumber;
  // Sign the event and store the signature
  await signAndStoreForAdmin(event, nonce);
  // Return the event
  return event;
});

// Helper function to sign the event and store the signature
async function signAndStoreForAdmin(event: text, nonce: number): Promise<void> {
  // Sign the message after adding nonce to it
  const message = event + "-" + nonce.toString();

  const signedMessage = await signMessage(message);
  // Store the signature
  await storeSignature(signedMessage.signature);
}

// Function to store the signature
async function storeSignature(signature: blob): Promise<void> {
  // Store the signature
  Signature.push(signature);
  await update([blob], blob, async () => {
    return signature;
  });
}

// Function to generate a nonce
function generateNonce(): number {
  // Implement nonce generation logic
  // It could be a timestamp or a counter
  return Date.now();
}

// Function to retrieve stored lock events
export const getLockEvents = query([nat32], text, async (index: nat32) => {
  return lockEvents[index];
});

// Function to retrieve stored lock events
export const getSignatures = query([nat32], blob, async (index: nat32) => {
  return Signature[index];
});
// Function to retrieve stored callers
export const getAuthorisedCallers = query(
  [nat32],
  Principal,
  async (index: nat32) => {
    return listAuthorizedPrincipals()[index];
  }
);

// Function to retrieve stored lock events
export const myPrincipal = query([], Principal, async () => {
  return caller();
});
