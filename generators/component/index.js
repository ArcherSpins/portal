/**
 * Component Generator
 */

const { componentExists } = require('../utils');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'isStory',
      default: true,
      message: 'Do you want stories for this component?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/tests/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/{{ properCase name }}.module.scss',
        templateFile: './component/scss.hbs',
        abortOnFail: true,
      },
    ];

    if (data.isStory) {
      actions.push({
        type: 'add',
        path: '../src/components/{{properCase name}}/{{properCase name}}.stories.js',
        templateFile: './component/story.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};