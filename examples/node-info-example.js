// Example usage

import { gatherNodeInfo } from "../node-info.js";

// You can pass a single string or an array of strings for specific flags
const output = gatherNodeInfo("all"); // You can change this to specific flags like ["os", "process, "env"]
console.dir(output, { depth: null, colors: true });
