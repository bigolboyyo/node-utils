import os from "os";
import process from "process";

const gatherOSInfo = async () => {
  const {
    hostname,
    userInfo,
    tmpdir,
    platform,
    type,
    release,
    arch,
    cpus,
    totalmem,
    freemem,
    uptime,
    loadavg,
    networkInterfaces,
  } = os;

  try {
    const osInfo = {
      hostname: hostname(),
      userInfo: userInfo(),
      cwd: process.cwd(),
      tempDir: tmpdir(),
      platform: platform(),
      type: type(),
      release: release(),
      arch: arch(),
      cpuCount: cpus().length,
      memory: {
        total: totalmem(),
        free: freemem(),
      },
      osUptime: uptime(),
      loadAverage: loadavg(),
      networkInterfaces: Object.entries(networkInterfaces()).flatMap(
        ([name, addrs]) =>
          addrs.map((iface) => ({
            name,
            address: iface.address,
            family: iface.family,
            mac: iface.mac,
            internal: iface.internal,
          }))
      ),
    };
    return osInfo;
  } catch (error) {
    console.error("Error gathering OS information:", error);
    return {};
  }
};

const gatherProcessInfo = async () => {
  try {
    const { execPath, version, versions, title, argv, execArgv, pid } = process;
    const processInfo = {
      execPath,
      version,
      versions,
      title,
      argv,
      execArgv,
      pid,
    };

    return processInfo;
  } catch (error) {
    console.error("Error gathering Process information:", error);
    return {};
  }
};

const gatherEnvInfo = () => {
  const { NODE_ENV, PATH, HOME, USER, SHELL, TERM, LOGNAME } = process.env;
  return { NODE_ENV, PATH, HOME, USER, SHELL, TERM, LOGNAME };
};

const gatherers = {
  os: gatherOSInfo,
  process: gatherProcessInfo,
  env: gatherEnvInfo,
};

const gatherNodeInfo = async (selectors = ["all"]) => {
  if (typeof selectors === "string") selectors = [selectors];

  const systemInfo = {};
  const isAll = selectors.includes("all");

  for (const [flag, fn] of Object.entries(gatherers)) {
    if (isAll || selectors.includes(flag)) {
      systemInfo[flag] = await fn();
    }
  }

  return systemInfo;
};

export { gatherNodeInfo };
