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
  Some,
} from "azle";
import { signMessage } from "./utils";
import { isAuthorized, listAuthorizedPrincipals } from "./auth";
import { caller } from "azle/src/lib/ic/caller";
import { managementCanister } from "azle/canisters/management";

export let lockEvents: text[] = [];
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

async function getTransactionReceipt(hash: string) {
  const httpResponse = await ic.call(managementCanister.http_request, {
    args: [
      {
        url: "https://eth-mainnet.g.alchemy.com/v2/docs-demo",
        method: {
          post: null,
        },
        max_response_bytes: Some(2_000n),
        headers: [],
        body: Some(
          Buffer.from(
            JSON.stringify({
              jsonrpc: "2.0",
              method: "eth_getTransactionReceipt",
              params: [hash],
              id: 1,
            }),
            "utf-8"
          )
        ),
        transform: Some({
          function: [ic.id(), "ethTransform"] as [Principal, string],
          context: Uint8Array.from([]),
        }),
      },
    ],
    cycles: 10_000_000_000n,
  });

  return Buffer.from(httpResponse.body.buffer).toString("utf-8");
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

export const getAllLockEvents = query([], text, async () => {
  return lockEvents.toString();
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
