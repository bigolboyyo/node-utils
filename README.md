# Node-Utils

A personal collection of Node.js utility functions for homelab projects and development work. Simple, reliable helpers for common file system, system information, and process management tasks.

## Features

- **File System**: Check file permissions, count files, get directory sizes, list contents, check if directory is empty
- **System Info**: Modular system information gathering with selectors for OS, process, and environment data
- **Flexible Data**: Use `gatherNodeInfo()` with selectors like `['os']`, `['process']`, `['env']`, or `['all']`

## Installation

```bash
git clone https://github.com/bigolboyyo/node-utils.git
cd node-utils
npm install
```

## Usage

```javascript
import { gatherNodeInfo } from "./node-utils/system-info.js";
import {
  checkAccess,
  countFiles,
  getDirSize,
  listDir,
} from "./node-utils/fs-info.js";

// System information with selectors
const allInfo = await gatherNodeInfo(); // gets all: os, process, env
const osOnly = await gatherNodeInfo(["os"]);
const osAndEnv = await gatherNodeInfo(["os", "env"]);

// File operations
const hasAccess = await checkAccess("./data", ["read", "write"]);
const fileCount = await countFiles("./src");
const dirSize = await getDirSize("./data");
const contents = await listDir("./projects");
```

## Examples

Check the `examples/` directory for usage examples of all available functions.

## About

This is a personal utility library I maintain for my homelab and various Node.js projects. It's a growing collection of helper functions that I find myself using regularly. Feel free to use or contribute if you find it useful.

**Repository**: https://github.com/bigolboyyo/node-utils
