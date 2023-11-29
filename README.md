# ICP Signature and Event Storage with Authentication

## Overview

This project is a decentralized application (dApp) on the Internet Computer (ICP) platform. It includes functionality to process and store event data, sign events using Threshold ECDSA (T-ECDSA), and manage authentication of users based on their Principals.

## Key Components

- **Watcher (`watcher.ts`)**: Monitors and processes lock events, triggering the signing process.
- **Utilities (`utils.ts`)**: Contains logic for signing messages using T-ECDSA.
- **Signature Storage (`signatureStorage.ts`)**: Provides functionality to persistently store and retrieve event data and their signatures.
- **Authentication (`auth.ts`)**: Manages authorization of users and canisters based on their Principals.
- **Types (`types.ts`)**: Defines data structures used across the project.

## Setup

1. **Install Dependencies**:
   Ensure the DFINITY Canister SDK (`dfx`) is installed. [DFINITY SDK](https://sdk.dfinity.org/docs/developers-guide/install-upgrade-remove.html).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/TeraBlock/tbc-icp
   cd tbc-icp
   ```

3. **Start the Local Replica**:
   ```bash
   dfx start --background
   ```

4. **Deploy the Canisters**:
   ```bash
   dfx deploy
   ```

## Usage

- **Process Lock Event**:
  Call `processLockEvent` to process and store a new lock event. This function automatically handles the signing and storage of the event's signature.

- **Retrieve Event Signature**:
  Use `getEventSignature` to retrieve the signature for a specific event by its ID.

- **Authorization**:
  The `auth.ts` module manages which users are authorized to invoke certain functions. A hardcoded principal is set initially, and additional principals can be dynamically added or removed.

## Authentication Management

- **Adding Authorized Principals**:
  Use the functions in `auth.ts` to manage which principals are authorized to call protected functions in the canister.

- **Verifying Principals**:
  The `processLockEvent` function checks the caller's principal to ensure they are authorized.

## Testing

Run the provided test suite:

```bash
dfx test
```

## Contributing

Contributions are welcome. Please follow the standard GitHub pull request workflow.
