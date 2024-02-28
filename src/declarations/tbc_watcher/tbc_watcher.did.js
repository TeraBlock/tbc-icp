export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getAuthorisedCallers' : IDL.Func([IDL.Nat32], [IDL.Principal], ['query']),
    'getLockEvents' : IDL.Func([IDL.Nat32], [IDL.Text], ['query']),
    'getPublicKey' : IDL.Func(
        [],
        [IDL.Record({ 'publicKey' : IDL.Vec(IDL.Nat8) })],
        [],
      ),
    'getSignatures' : IDL.Func([IDL.Nat32], [IDL.Vec(IDL.Nat8)], ['query']),
    'myPrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'processLockEvent' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
