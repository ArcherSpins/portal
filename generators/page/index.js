/**
 * Container Generator
 */

const { pageExists } = require('../utils');

module.exports = {
  description: 'Add a page component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Home',
      validate: value => {
        if (/.+/.test(value)) {
          return pageExists(value)
            ? 'A page with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../src/pages/{{properCase name}}/index.js',
        templateFile: './page/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/pages/{{properCase name}}/tests/index.test.js',
        templateFile: './page/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/pages/{{properCase name}}/{{properCase name}}.module.scss',
        templateFile: './page/scss.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: '/pages/',
    });

    return actions;
  },
};