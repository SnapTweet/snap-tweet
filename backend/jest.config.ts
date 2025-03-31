import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.json",
    },
  },
  coverageThreshold: {
    global: {
      branches: 72,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup.ts",
    "<rootDir>/src/config/db.ts",
  ], // ✅ Load env + connect/disconnect DB
};

export default config;
