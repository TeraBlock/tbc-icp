import { update, query, int, Record, text, blob, AzleText, nat64, nat32 } from 'azle';
import { signMessage } from './utils';

let lockEvents : text [] = [];
let Signature : blob [] = [];

// Function to process and store lock events
export const processLockEvent = update([text], text , async(event : text) => {
    // Generate a nonce
    const nonce = generateNonce();
    // Sign the event and store the signature
    await signAndStoreForAdmin(event, nonce);
    lockEvents.push(event);
    // Return the event
    return event;
});

// Helper function to sign the event and store the signature
async function signAndStoreForAdmin(event: text, nonce : number): Promise<void> {
    // Sign the message after adding nonce to it
    const message = event+ '-' + nonce.toString();
    
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
export const getLockEvents = query([nat32],text, async (index : nat32) => {
    return lockEvents[index];
});

// Function to retrieve stored lock events
export const getSignatures = query([nat32], blob, async (index : nat32) => {
    return Signature[index];
});
