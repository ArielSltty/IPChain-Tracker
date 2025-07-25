import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  type Geo = {
    country: Text;
    city: Text;
    isp: Text;
    lat: Float;
    lon: Float;
  };

  type LoginLog = {
    email: Text;
    principal: Text;
    ip: Text;
    timestamp: Nat;
    device: Text;
    geo: Geo;
    isAnomalous: Bool;
  };

  type LogEntry = {
    ip: Text;
    location: Text;
    device: Text;
    timestamp: Int;
    isAnomalous: Bool;
  };

  var logsMap : TrieMap.TrieMap<Text, Buffer.Buffer<LoginLog>> = TrieMap.TrieMap(Text.equal, Text.hash);
  var userLogs : TrieMap.TrieMap<Principal, Buffer.Buffer<LogEntry>> = TrieMap.TrieMap(Principal.equal, Principal.hash);

  let adminUser : Text = "admin";
  let adminPass : Text = "admin123";

  public shared func log_login(log: LoginLog) : async () {
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
    let newLog = {
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

  public query func getUserLogs(email: Text, principal: Text) : async [LoginLog] {
    let key = if (principal != "") principal else email;
    return switch (logsMap.get(key)) {
      case (?buf) Buffer.toArray(buf);
      case null [];
    };
  };

  public query func queryPublicLogs(principal: Text) : async [LoginLog] {
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
    return result;
  };

  public query func adminLogin(username: Text, password: Text) : async Bool {
    return username == adminUser and password == adminPass;
  };

  public query func getTotalUsers() : async Nat {
    return logsMap.size();
  };

  public query func getTotalLogs() : async Nat {
    var total : Nat = 0;
    for ((_, buf) in logsMap.entries()) {
      total += buf.size();
    };
    return total;
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
    return count;
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
    return result;
  };

  public shared func recordLogin(userPrincipal: Principal, ip: Text, location: Text, device: Text, timestamp: Int) : async () {
    let buf = switch (userLogs.get(userPrincipal)) {
      case (?b) b;
      case null Buffer.Buffer<LogEntry>(0);
    };
    let prevIPs = Buffer.Buffer<Text>(0);
    let size = buf.size();
    let start = if (size > 5) size - 5 else 0;
    if (size > 0 and start <= size - 1) {
      let end = size - 1;
      for (i in Iter.range(start, end)) {
        prevIPs.add(buf.get(i).ip);
      };
    };
    let anomalous = await isAnomalousLogin(ip, Buffer.toArray(prevIPs));
    let entry : LogEntry = {
      ip = ip;
      location = location;
      device = device;
      timestamp = timestamp;
      isAnomalous = anomalous;
    };
    buf.add(entry);
    userLogs.put(userPrincipal, buf);
  };

  public shared query func getLoginHistory(userPrincipal: Principal) : async [LogEntry] {
    return switch (userLogs.get(userPrincipal)) {
      case (?buf) Buffer.toArray(buf);
      case null [];
    };
  };

  public shared query func isAnomalousLogin(newIP: Text, previousIPs: [Text]) : async Bool {
    for (ip in previousIPs.vals()) {
      if (ip == newIP) { return false };
    };
    return true;
  };

  public shared func notifyAnomaly(user: Principal, message: Text) : async Text {
    return "Notifikasi untuk " # Principal.toText(user) # ": " # message;
  };

  public shared func uploadToIPFS(logData: Text) : async Text {
    return "ipfs://dummyhash/" # logData;
  }
}