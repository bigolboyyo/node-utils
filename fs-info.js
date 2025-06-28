import fs from "fs";
import path from "path";

const MODE_MAP = {
  read: fs.constants.R_OK,
  write: fs.constants.W_OK,
  execute: fs.constants.X_OK,
};

const checkAccess = (target, modes = "write", detailed = false) => {
  if (typeof modes === "string") modes = [modes];

  if (detailed) {
    const results = {};
    for (const mode of modes) {
      const flag = MODE_MAP[mode];
      if (!flag) {
        throw new Error(
          `Invalid mode: ${mode}. Allowed modes: ${Object.keys(MODE_MAP).join(
            ", "
          )}`
        );
      }
      try {
        fs.accessSync(target, flag);
        results[mode] = true;
      } catch {
        results[mode] = false;
      }
    }
    return results;
  } else {
    const flags = modes.reduce((acc, mode) => {
      const flag = MODE_MAP[mode];
      if (!flag) {
        throw new Error(
          `Invalid mode: ${mode}. Allowed modes: ${Object.keys(MODE_MAP).join(
            ", "
          )}`
        );
      }
      return acc | flag;
    }, 0);

    try {
      fs.accessSync(target, flags);
      return true;
    } catch {
      return false;
    }
  }
};

const countFilesSync = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files.length;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return 0;
  }
};

const getFileSize = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      return stats.size;
    }
    throw new Error(`Path ${filePath} is not a file.`);
  } catch (error) {
    console.error(`Error getting file size for ${filePath}:`, error);
    return -1;
  }
};

const getDirSize = (dirPath) => {
  let totalSize = 0;

  try {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      let stats;

      try {
        stats = fs.statSync(filePath);
      } catch (err) {
        if (err.code === "EACCES") {
          // Permission denied, skip this file/dir but keep going
          continue;
        }
        throw err; // rethrow other errors
      }

      if (stats.isFile()) {
        totalSize += stats.size;
      } else if (stats.isDirectory()) {
        const subdirSize = getDirSize(filePath);
        if (subdirSize !== -1) {
          totalSize += subdirSize;
        }
        // if -1 returned, subdir access denied: skip silently
      }
    }
  } catch (error) {
    if (error.code === "EACCES") {
      return -1; // Access denied on top-level dir
    }
    if (error.code === "ENOENT") {
      return;
    }

    return -1;
  }

  return totalSize;
};

const isDirEmpty = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
  } catch (error) {
    if (error.code === "ENOENT") {
      return null; // Directory does not exist
    } else {
      console.error(`Error checking if directory ${dirPath} is empty:`, error);
    }
    return false;
  }
};

const getFileType = (targetPath) => {
  try {
    const stats = fs.lstatSync(targetPath); // lstat for symlinks info
    if (stats.isFile()) return "file";
    if (stats.isDirectory()) return "directory";
    if (stats.isSymbolicLink()) return "symlink";
    if (stats.isSocket()) return "socket";
    if (stats.isFIFO()) return "fifo";
    if (stats.isCharacterDevice()) return "char-device";
    if (stats.isBlockDevice()) return "block-device";
    return "unknown";
  } catch (e) {
    console.error(`Error getting file type for ${targetPath}:`, e.message);
    return "error";
  }
};

const listDir = (dirPath) => {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    return entries.map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      let size;

      if (entry.isFile()) {
        try {
          size = fs.statSync(fullPath).size;
        } catch {
          size = null;
        }
      } else if (entry.isDirectory()) {
        const dirSize = getDirSize(fullPath);
        size = dirSize === -1 ? "access denied" : dirSize;
      } else {
        size = null;
      }

      return {
        name: entry.name,
        type: getFileType(fullPath),
        size,
      };
    });
  } catch (e) {
    console.error(`Error listing directory ${dirPath}:`, e.message);
    return [];
  }
};

export {
  checkAccess,
  countFilesSync,
  getFileSize,
  getFileType,
  isDirEmpty,
  listDir,
};
