import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Geo {
  'isp' : string,
  'lat' : number,
  'lon' : number,
  'country' : string,
  'city' : string,
}
export interface IPBlock {
  'adminLogin' : ActorMethod<[string, string], boolean>,
  'getAllAnomalies' : ActorMethod<[], Array<LoginLog>>,
  'getAnomalyCount' : ActorMethod<[], bigint>,
  'getAnomalyReports' : ActorMethod<[], Array<LoginLog>>,
  'getLoginHistory' : ActorMethod<[Principal], Array<LogEntry>>,
  'getTotalLogs' : ActorMethod<[], bigint>,
  'getTotalUsers' : ActorMethod<[], bigint>,
  'getUserLogs' : ActorMethod<[string, string], Array<LoginLog>>,
  'isAnomalousLogin' : ActorMethod<[string, Array<string>], boolean>,
  'log_login' : ActorMethod<[LoginLog], undefined>,
  'notifyAnomaly' : ActorMethod<[Principal, string], string>,
  'queryPublicLogs' : ActorMethod<[string], Array<LoginLog>>,
  'recordLogin' : ActorMethod<
    [Principal, string, string, string, bigint],
    undefined
  >,
  'registerUser' : ActorMethod<[string, string], boolean>,
  'uploadToIPFS' : ActorMethod<[string], string>,
  'validateUser' : ActorMethod<[string, string], boolean>,
}
export interface LogEntry {
  'ip' : string,
  'isAnomalous' : boolean,
  'device' : string,
  'timestamp' : bigint,
  'location' : string,
}
export interface LoginLog {
  'ip' : string,
  'geo' : Geo,
  'principal' : string,
  'isAnomalous' : boolean,
  'email' : string,
  'device' : string,
  'timestamp' : bigint,
}
export interface _SERVICE extends IPBlock {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
