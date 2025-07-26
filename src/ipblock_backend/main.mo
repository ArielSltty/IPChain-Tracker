import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor class IPBlock() = this {
  // Type definitions
  type Geo = {
    country : Text;
    city : Text;
    isp : Text;
    lat : Float;
    lon : Float;
  };

  type LoginLog = {
    email : Text;
    principal : Text;
    ip : Text;
    timestamp : Nat;
    device : Text;
    geo : Geo;
    isAnomalous : Bool;
  };

  // Storage
  var logsMap = TrieMap.TrieMap<Text, Buffer.Buffer<LoginLog>>(Text.equal, Text.hash);

  // Login logging function
  public shared func log_login(log : LoginLog) : async () {
    let key = if (log.principal != "") log.principal else log.email;
    let buf = switch (logsMap.get(key)) {
      case (?b) b;
      case null Buffer.Buffer<LoginLog>(0);
    };
    
    var anomalous = false;
    if (buf.size() > 0) {
      let prev = buf.get(buf.size() - 1);
      if (prev.ip != log.ip) anomalous := true;
      let dist = ((prev.geo.lat - log.geo.lat) ** 2 + (prev.geo.lon - log.geo.lon) ** 2) ** 0.5;
      if (dist > 2.0) anomalous := true;
      if (prev.geo.country != log.geo.country) anomalous := true;
    };
    
    let newLog : LoginLog = {
      email = log.email;
      principal = log.principal;
      ip = log.ip;
      timestamp = log.timestamp;
      device = log.device;
      geo = log.geo;
      isAnomalous = anomalous;
    };
    
    buf.add(newLog);
    logsMap.put(key, buf);
  };

  // Query functions
  public query func getUserLogs(email : Text, principal : Text) : async [LoginLog] {
    let key = if (principal != "") principal else email;
    return switch (logsMap.get(key)) {
      case (?buf) Buffer.toArray(buf);
      case null [];
    };
  };

  public query func queryPublicLogs(principal : Text) : async [LoginLog] {
    return switch (logsMap.get(principal)) {
      case (?buf) Buffer.toArray(buf);
      case null [];
    };
  };

  public query func getAnomalyReports() : async [LoginLog] {
    var result : [LoginLog] = [];
    for ((_, buf) in logsMap.entries()) {
      for (log in buf.vals()) {
        if (log.isAnomalous) {
          result := Array.append(result, [log]);
        }
      }
    };
    result;
  };

  public query func getTotalUsers() : async Nat {
    logsMap.size();
  };

  public query func getTotalLogs() : async Nat {
    var total : Nat = 0;
    for ((_, buf) in logsMap.entries()) {
      total += buf.size();
    };
    total;
  };

  public query func getAnomalyCount() : async Nat {
    var count : Nat = 0;
    for ((_, buf) in logsMap.entries()) {
      for (log in buf.vals()) {
        if (log.isAnomalous) {
          count += 1;
        }
      }
    };
    count;
  };

  public query func getAllAnomalies() : async [LoginLog] {
    var result : [LoginLog] = [];
    for ((_, buf) in logsMap.entries()) {
      for (log in buf.vals()) {
        if (log.isAnomalous) {
          result := Array.append(result, [log]);
        }
      }
    };
    result;
  };

  // Notification system
  public shared func notifyAnomaly(user : Principal, message : Text) : async Text {
    "Notifikasi untuk " # Principal.toText(user) # ": " # message;
  };

  public shared func uploadToIPFS(logData : Text) : async Text {
    "ipfs://dummyhash/" # logData;
  };
};