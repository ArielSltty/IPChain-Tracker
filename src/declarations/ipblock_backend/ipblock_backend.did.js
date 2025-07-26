export const idlFactory = ({ IDL }) => {
  const Geo = IDL.Record({
    'isp' : IDL.Text,
    'lat' : IDL.Float64,
    'lon' : IDL.Float64,
    'country' : IDL.Text,
    'city' : IDL.Text,
  });
  const LoginLog = IDL.Record({
    'ip' : IDL.Text,
    'geo' : Geo,
    'principal' : IDL.Text,
    'isAnomalous' : IDL.Bool,
    'email' : IDL.Text,
    'device' : IDL.Text,
    'timestamp' : IDL.Nat,
  });
  const IPBlock = IDL.Service({
    'getAllAnomalies' : IDL.Func([], [IDL.Vec(LoginLog)], ['query']),
    'getAnomalyCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getAnomalyReports' : IDL.Func([], [IDL.Vec(LoginLog)], ['query']),
    'getTotalLogs' : IDL.Func([], [IDL.Nat], ['query']),
    'getTotalUsers' : IDL.Func([], [IDL.Nat], ['query']),
    'getUserLogs' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Vec(LoginLog)],
        ['query'],
      ),
    'log_login' : IDL.Func([LoginLog], [], []),
    'notifyAnomaly' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Text], []),
    'queryPublicLogs' : IDL.Func([IDL.Text], [IDL.Vec(LoginLog)], ['query']),
    'uploadToIPFS' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
  return IPBlock;
};
export const init = ({ IDL }) => { return []; };
