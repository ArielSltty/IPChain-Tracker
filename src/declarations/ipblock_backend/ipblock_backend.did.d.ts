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
  'getAllAnomalies' : ActorMethod<[], Array<LoginLog>>,
  'getAnomalyCount' : ActorMethod<[], bigint>,
  'getAnomalyReports' : ActorMethod<[], Array<LoginLog>>,
  'getTotalLogs' : ActorMethod<[], bigint>,
  'getTotalUsers' : ActorMethod<[], bigint>,
  'getUserLogs' : ActorMethod<[string, string], Array<LoginLog>>,
  'log_login' : ActorMethod<[LoginLog], undefined>,
  'notifyAnomaly' : ActorMethod<[Principal, string], string>,
  'queryPublicLogs' : ActorMethod<[string], Array<LoginLog>>,
  'uploadToIPFS' : ActorMethod<[string], string>,
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
