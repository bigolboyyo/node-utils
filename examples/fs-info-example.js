import {
  checkAccess,
  countFilesSync,
  getFileSize,
  isDirEmpty,
  getFileType,
  listDir,
} from "../fs-info.js";
import os from "os";

// Example usage of checkAccess function
console.log(
  "\n" +
    "-".repeat(25) +
    " checkAccess(target: string, modes: string || string[], detailed: boolean) " +
    "-".repeat(25) +
    "\n"
);
// Will return true or false by default based on "write" access
console.log("Access to current directory:", checkAccess(process.cwd()));

// Can pass a string or an array of strings
// You can also check for multiple modes and get detailed results
// Passing true for detailed results: {}
console.log(
  "Access to /bin directory:",
  checkAccess("/bin", ["write", "read", "execute"], true)
);

console.log(
  "\n" +
    "-".repeat(25) +
    " countFilesSync(dirPath: string) " +
    "-".repeat(25) +
    "\n"
);

// Count files in the current directory
console.log(
  "Number of files in current directory:",
  countFilesSync(process.cwd())
);

console.log("Number of files in /tmp directory:", countFilesSync("/tmp"));

console.log(
  "\n" +
    "-".repeat(25) +
    " countFilesSync(dirPath: string) " +
    "-".repeat(25) +
    "\n"
);

// Count files in the current directory
console.log(
  "Number of files in current directory:",
  countFilesSync(process.cwd())
);

console.log("Number of files in /tmp directory:", countFilesSync("/tmp"));

console.log(
  "\n" +
    "-".repeat(25) +
    " getFileSize(filePath: string) " +
    "-".repeat(25) +
    "\n"
);
// Example usage of getFileSize function
// returns file size in bytes
console.log(
  "Size of current script file:",
  getFileSize("fs-info-example.js"),
  "(bytes)"
);

console.log(
  "Size of .bashrc file:",
  getFileSize(os.homedir() + "/.bashrc"),
  "(bytes)"
);

console.log(
  "\n" +
    "-".repeat(25) +
    " isDirEmpty(dirPath: string) " +
    "-".repeat(25) +
    "\n"
);
// Example usage of isDirEmpty function
console.log("Is current directory empty?", isDirEmpty(process.cwd()));

// Returns null if the directory does not exist
console.log(
  "Is /aRandomEmptyDir directory empty?",
  isDirEmpty("/aRandomEmptyDir")
);

console.log(
  "\n" + "-".repeat(25) + " listDir(dirPath: string) " + "-".repeat(25) + "\n"
);

// listDir function usage example
console.log("Listing current directory:", listDir(process.cwd()));
console.log("Listing /etc directory:", listDir("/etc"));
// console.log("Listing our C: drive:", listDir("/mnt/c"));

console.log(
  "\n" +
    "-".repeat(25) +
    " getFileType(targetPath: string) " +
    "-".repeat(25) +
    "\n"
);

//getFileType function usage examples (can be a file, directory, symlink, socket, fifo, char-device, block-device)
console.log("fs-info-example.js →", getFileType("fs-info-example.js"));
console.log("/home →", getFileType(os.homedir()));
console.log("/bin →", getFileType("/bin"));
console.log("/dev/sda →", getFileType("/dev/sda"));
