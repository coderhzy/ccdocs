import {
  frontendAlgorithm,
  rootDir,
  sidebarBackend,
  sidebarFrontend,
  sidebarInterview,
} from "./constent/siderbar-fn";

export default {
  "/": rootDir(),
  "/frontend/": sidebarFrontend(),
  "/backend/": sidebarBackend(),
  "/interview/": sidebarInterview(),
  "/algorithm/": frontendAlgorithm(),
};
