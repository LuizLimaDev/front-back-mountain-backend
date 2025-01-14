/** @type {import('jest').Config} */
const config = {
	roots: ["<rootDir>"],
	coverageDirectory: "coverage",
	testEnvironment: "node",
	coverageProvider: "v8",
	setupFilesAfterEnv: ["./test/jest.setup.js"],
	testMatch: ["**/*.e2e.js"],
	testPathIgnorePatterns: ["node_modules", ".github"]
};

module.exports = config;