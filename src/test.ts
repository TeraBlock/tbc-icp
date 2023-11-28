import { signMessage } from './utils';

async function testSignAndVerify() {

    // Sign the message
    const signedMessage = await signMessage({
        username: "test_user",
        amount: BigInt(100),
        chainId: "test_chain",
        lockHash: "test_lock_hash",
        token: "test_token"
        }, 0);

    console.log("Signed Message:", signedMessage);

    const isSignatureValid = signedMessage != null;
    console.log("Is Signature Valid:", isSignatureValid);
}

testSignAndVerify();
