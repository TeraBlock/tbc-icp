import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getAuthorisedCallers' : ActorMethod<[number], Principal>,
  'getLockEvents' : ActorMethod<[number], string>,
  'getPublicKey' : ActorMethod<[], { 'publicKey' : Uint8Array | number[] }>,
  'getSignatures' : ActorMethod<[number], Uint8Array | number[]>,
  'myPrincipal' : ActorMethod<[], Principal>,
  'processLockEvent' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
