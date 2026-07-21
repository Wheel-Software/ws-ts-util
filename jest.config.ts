// jest.config.js
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // The test environment that will be used for testing
  //testEnvironment: "jest-environment-node","jsdom","node",
  testEnvironment: "jest-fixed-jsdom",
  fakeTimers: { enableGlobally: true },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules"],

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "mts",
    "cts",
    "tsx",
    "json",
    "node",
  ],

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    //customExportConditions: ["msw", "node", "node-addons"],
    customExportConditions: ["node"],
  }, // Clears conditions to let MSW find its Node.js exports

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  verbose: true,
  moduleNameMapper: {
    // Maps '@/' to your source directory (usually 'src/')
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default config;
