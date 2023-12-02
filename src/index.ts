import { Canister } from 'azle';
import {getPublicKey} from './utils';
import { startTimer, stopTimer, myPrincipal, getLockEvents, getSignatures, getAuthorisedCallers } from './watcher';

export default Canister({
    getPublicKey,
    startTimer,
    stopTimer,
    myPrincipal,
    getLockEvents,
    getSignatures,
    getAuthorisedCallers
});
