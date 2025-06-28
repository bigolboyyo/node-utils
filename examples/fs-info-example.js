import {
  checkAccess,
  countFiles,
  getFileSize,
  isDirEmpty,
  getFileType,
  listDir,
} from "../src/fs-info.js";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  console.log(
    "\n" +
      "-".repeat(25) +
      " checkAccess(target: string, modes: string || string[], detailed: boolean) " +
      "-".repeat(25) +
      "\n"
  );
  console.log("Access to current directory:", await checkAccess(process.cwd()));
  console.log(
    "Access to /bin directory:",
    await checkAccess("/bin", ["write", "read", "execute"], true)
  );

  console.log(
    "\n" +
      "-".repeat(25) +
      " countFiles(dirPath: string) " +
      "-".repeat(25) +
      "\n"
  );
  console.log(
    "Number of files in current directory:",
    await countFiles(process.cwd())
  );
  console.log("Number of files in /tmp directory:", await countFiles("/tmp"));

  console.log(
    "\n" +
      "-".repeat(25) +
      " getFileSize(filePath: string) " +
      "-".repeat(25) +
      "\n"
  );
  console.log(
    "Size of current script file:",
    await getFileSize(path.join(__dirname, "fs-info-example.js")),
    "(bytes)"
  );
  console.log(
    "Size of .bashrc file:",
    await getFileSize(os.homedir() + "/.bashrc"),
    "(bytes)"
  );

  console.log(
    "\n" +
      "-".repeat(25) +
      " isDirEmpty(dirPath: string) " +
      "-".repeat(25) +
      "\n"
  );
  console.log("Is current directory empty?", await isDirEmpty(process.cwd()));
  console.log(
    "Is /aRandomEmptyDir directory empty?",
    await isDirEmpty("/aRandomEmptyDir")
  );

  console.log(
    "\n" + "-".repeat(25) + " listDir(dirPath: string) " + "-".repeat(25) + "\n"
  );
  console.log("Listing current directory:", await listDir(process.cwd()));
  console.log("Listing /etc directory:", await listDir("/etc"));
  // console.log("Listing our C: drive:", await listDir("/mnt/c"));

  console.log(
    "\n" +
      "-".repeat(25) +
      " getFileType(targetPath: string) " +
      "-".repeat(25) +
      "\n"
  );
  console.log(
    "fs-info-example.js →",
    await getFileType(path.join(__dirname, "fs-info-example.js"))
  );
  console.log("/home →", await getFileType(os.homedir()));
  console.log("/bin →", await getFileType("/bin"));
  console.log("/dev/sda →", await getFileType("/dev/sda"));
})();
