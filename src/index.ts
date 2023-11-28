import { Canister } from 'azle';
import {getLockEvents, processLockEvent, getSignatures} from './watcher';
import {getPublicKey} from './utils';

export default Canister({
    getPublicKey,
    processLockEvent,
    getLockEvents,
    getSignatures
});
