module.exports = {
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `cypress`],
  transformIgnorePatterns: [`node_modules`],
  globals: {
    __PATH_PREFIX__: ``
  },
  testURL: `http://localhost:3000`
};
