module.exports = {

  testEnvironment: 'jsdom',

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.[t|j]sx?$": ["babel-jest", { configFile: "./.babelrc" }]
  },
  globals: {
    "process.env.NODE_ENV": "test"
  },
};