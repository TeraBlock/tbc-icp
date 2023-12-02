import { update, query, text, blob, nat32, ic, Principal, nat, Canister, Void } from 'azle';
import { generateNonce, signMessage } from './utils';
import { isAuthorized, listAuthorizedPrincipals } from './auth';
import { caller } from 'azle/src/lib/ic/caller';
import { sha256 } from 'js-sha256';

let timerHandle: nat | null = null;
let lockEvents: text[] = [];
let Signature: blob[] = [];

// Function to store the signature
async function storeSignature(signature: blob): Promise<void> {
    // Store the signature
    Signature.push(signature);
    await update([blob], blob, async () => {
        return signature;
    });
}

// Helper function to sign the event and store the signature
async function signAndStoreForAdmin(event: text, nonce: number): Promise<void> {
    // Sign the message after adding nonce to it
    const message = event + '-' + nonce.toString();
    const messageHash = sha256(message);
    if (messageHash == null) {
        return;
    }
    const messageHashBytes = new Uint8Array(messageHash?.match(/.{1,2}/g).map(byte => parseInt(byte, 32)));

    const signedMessage = await signMessage(messageHashBytes);
    // Store the signature
    await storeSignature(signedMessage.signature);
}

// Placeholder function for making HTTP calls to fetch lock events
async function fetchLockEventsFromAPI(): Promise<text[]> {
    // Implement the logic to fetch lock events from an external API
    // Return an array of LockEvent objects
    return []; // Placeholder return
}

// Function to periodically check for lock events
async function checkForLockEvents(): Promise<void> {
    const newLockEvents = await fetchLockEventsFromAPI();
    newLockEvents.forEach(event => {
        processLockEvent(event); // Process each lock event
    });
}

// Function to process and store lock events
async function processLockEvent(event: text) {
    const callerPrincipal = caller();
    if (!isAuthorized(callerPrincipal)) {
        ic.trap("Unauthorized access");
    }
    // Generate a nonce
    const nonce = generateNonce();
    // Sign the event and store the signature
    await signAndStoreForAdmin(event, nonce);
    lockEvents.push(event);
    // Return the event
    return event;
};

export const startTimer = update([], nat, () => {
    if (timerHandle !== null) {
        ic.trap('Timer is already running');
    }

    timerHandle = ic.setTimer(5_000_000_000n, () => {
        checkForLockEvents();
    }); // 5 seconds in nanoseconds

    return timerHandle;
});
export const stopTimer = update([], Void, () => {
    if (timerHandle === null) {
        ic.trap('Timer is not running');
    }
    ic.clearTimer(timerHandle || 0n);
    timerHandle = null;
});
export const getLockEvents = query([nat32], text, async (index: nat32) => {
    return lockEvents[index];
});
// Function to retrieve stored lock events
export const getSignatures = query([nat32], blob, async (index: nat32) => {
    return Signature[index];
});
// Function to retrieve stored callers
export const getAuthorisedCallers = query([nat32], Principal, async (index: nat32) => {
    return listAuthorizedPrincipals()[index];
});
// Function to retrieve stored lock events
export const myPrincipal = query([], Principal, async () => {
    return caller();
});