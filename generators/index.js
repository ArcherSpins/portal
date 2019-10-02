const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const componentGenerator = require('./component');
const containerGenerator = require('./container');
const pageGenerator = require('./page');
const reduxGenerator = require('./redux');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('page', pageGenerator);
  plop.setGenerator('redux', reduxGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../src/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**',
      '**.js',
    )}`;

    try {
      execSync(`yarn prettify "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });

  plop.setActionType('log', (_, config) => {
    console.log(config.message);
  });

  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../src/containers/${comp}`),
        fs.F_OK,
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};