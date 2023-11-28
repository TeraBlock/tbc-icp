# ICP Signature and Event Storage

## Overview

This project is an implementation of a decentralized application (dApp) on the Internet Computer (ICP) platform. It includes functionality to process and store event data, sign these events using Threshold ECDSA (T-ECDSA), and persistently store these signatures for later retrieval and verification.

## Key Components

- **Watcher (`watcher.ts`)**: Monitors and processes lock events, triggering the signing process.
- **Utilities (`utils.ts`)**: Contains the logic for signing messages using T-ECDSA.
- **Signature Storage (`signatureStorage.ts`)**: Provides functionality to store and retrieve event data and their signatures using ICP's stable storage.
- **Types (`types.ts`)**: Defines the data structures used across the project.

## Setup

1. **Install Dependencies**:
   Ensure you have the DFINITY Canister SDK (`dfx`) installed. You can get it from [DFINITY SDK](https://sdk.dfinity.org/docs/developers-guide/install-upgrade-remove.html).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/TeraBlock/tbc-icp.git
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
  Call the `processLockEvent` function to process and store a new lock event. This function will automatically handle the signing and storage of the event's signature.

- **Retrieve Event Signature**:
  Use the `getEventSignature` function to retrieve the signature for a specific event by its ID.

- **Additional Operations**:
  The canister includes additional functionality for querying and resetting the stored data. Refer to the respective function documentation for details.

## Testing

Run the provided test suite to ensure that all components are functioning correctly:

```bash
dfx test
```

## Contributing

This project is currently worked by TeraBlock. Contributions to this project are welcome. Please follow the standard GitHub pull request workflow.