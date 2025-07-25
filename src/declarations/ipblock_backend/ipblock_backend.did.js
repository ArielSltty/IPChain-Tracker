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
  const LogEntry = IDL.Record({
    'ip' : IDL.Text,
    'isAnomalous' : IDL.Bool,
    'device' : IDL.Text,
    'timestamp' : IDL.Int,
    'location' : IDL.Text,
  });
  const IPBlock = IDL.Service({
    'adminLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
    'getAllAnomalies' : IDL.Func([], [IDL.Vec(LoginLog)], ['query']),
    'getAnomalyCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getAnomalyReports' : IDL.Func([], [IDL.Vec(LoginLog)], ['query']),
    'getLoginHistory' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(LogEntry)],
        ['query'],
      ),
    'getTotalLogs' : IDL.Func([], [IDL.Nat], ['query']),
    'getTotalUsers' : IDL.Func([], [IDL.Nat], ['query']),
    'getUserLogs' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Vec(LoginLog)],
        ['query'],
      ),
    'isAnomalousLogin' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text)],
        [IDL.Bool],
        ['query'],
      ),
    'log_login' : IDL.Func([LoginLog], [], []),
    'notifyAnomaly' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Text], []),
    'queryPublicLogs' : IDL.Func([IDL.Text], [IDL.Vec(LoginLog)], ['query']),
    'recordLogin' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Text, IDL.Text, IDL.Int],
        [],
        [],
      ),
    'registerUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'uploadToIPFS' : IDL.Func([IDL.Text], [IDL.Text], []),
    'validateUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
  });
  return IPBlock;
};
export const init = ({ IDL }) => { return []; };
