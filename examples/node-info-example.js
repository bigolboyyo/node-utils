import { gatherNodeInfo } from "../node-info.js";

(async () => {
  // You can pass a single string or an array of strings for specific flags
  console.dir(await gatherNodeInfo("all"), { depth: null, colors: true }); // or ["os", "process", "env"]
})();
