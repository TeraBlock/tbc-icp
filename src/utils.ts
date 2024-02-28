import { blob, ic, None, Record, update, text } from "azle";
import { managementCanister } from "azle/canisters/management";
import { createHash } from "crypto";

const PublicKey = Record({
  publicKey: blob,
});

// Function to get the public key for the canister
export const getPublicKey = update([], PublicKey, async () => {
  const caller = ic.caller().toUint8Array();

  const publicKeyResult = await ic.call(managementCanister.ecdsa_public_key, {
    args: [
      {
        canister_id: None,
        derivation_path: [caller],
        key_id: {
          curve: { secp256k1: null },
          name: "dfx_test_key",
        },
      },
    ],
  });

  return {
    publicKey: publicKeyResult.public_key,
  };
});

// Function to sign a message
export const signMessage = async (event: text) => {
  const messageHash = new Uint8Array(Buffer.from(event)).slice(0, 32); // Convert message to Uint8Array

  // generate a 32 bit digest hash of the message
  //   const messageHash = createHash("sha256").update(event).digest();

  if (messageHash.length !== 32) {
    ic.trap("messageHash must be 32 bytes, current length : " + messageHash);
  }

  const caller = ic.caller().toUint8Array();

  const signatureResult = await ic.call(managementCanister.sign_with_ecdsa, {
    args: [
      {
        message_hash: messageHash,
        derivation_path: [caller],
        key_id: {
          curve: { secp256k1: null },
          name: "dfx_test_key",
        },
      },
    ],
    cycles: 10_000_000_000n,
  });

  return {
    signature: signatureResult.signature,
  };
};
