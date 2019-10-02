const fs = require('fs');
const path = require('path');

const pageComponents = fs.readdirSync(
  path.join(__dirname, '../src/components'),
);

const pageContainers = fs.readdirSync(
  path.join(__dirname, '../src/containers'),
);

const reduxContainer = fs.readdirSync(
  path.join(__dirname, '../src/store'),
);

const pageFolder = fs.readdirSync(
  path.join(__dirname, '../src/pages'),
);

const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

function reduxFilesExists(file) {
  return reduxContainer.indexOf(file) >= 0;
}

function pageExists(page) {
  return pageFolder.indexOf(page) >= 0;
}

module.exports = {
  componentExists,
  reduxFilesExists,
  pageExists
};