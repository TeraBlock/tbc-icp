import { Canister } from 'azle';
import {getPublicKey} from './utils';

export default Canister({
    getPublicKey,
});
export * from './watcher';
