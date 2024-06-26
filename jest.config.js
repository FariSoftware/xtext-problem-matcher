module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.ts",
    "!dist/**",
    "!lib/**",
    "!**/node_modules/**",
  ],
  coverageDirectory: "./coverage/",
  moduleFileExtensions: ["js", "ts"],
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testRunner: "jest-circus/runner",
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      diagnostics: false,
    }]
  },
  verbose: true,
};

// This will strip :: commands from the log output during test runs

const processStdoutWrite = process.stdout.write.bind(process.stdout);

process.stdout.write = (str, encoding, cb) => {
  if (!str.match(/^::/)) {
    return processStdoutWrite(str, encoding, cb);
  }
};
