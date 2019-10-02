/**
 * Container Generator
 */

const { reduxFilesExists } = require('../utils');

module.exports = {
  description: 'Add a redux boilerplate files (actions, reducers, constants, sagas)',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Auth',
      validate: (value) => {
        if (/.+/.test(value)) {
          return reduxFilesExists(value)
            ? 'An action with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'isSaga',
      default: true,
      message: 'Do you want create sagas for handling async flow?',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../src/store/{{properCase name}}/actions.js',
        templateFile: './redux/actions.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{properCase name}}/reducers.js',
        templateFile: './redux/reducers.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{properCase name}}/constants.js',
        templateFile: './redux/constants.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/store/{{properCase name}}/types.js',
        templateFile: './redux/types.js.hbs',
        abortOnFail: true,
      },
    ];

    if (data.isSaga) {
      actions.push({
        type: 'add',
        path: '../src/store/{{properCase name}}/sagas.js',
        templateFile: './redux/saga.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/store/',
    });

    actions.push({
      type: 'log',
      message: "❗❗  Don't forget to import created reducer in 'store/rootReducer.js'\n",
    });

    if (data.isSaga) {
      actions.push({
        type: 'log',
        message: "❗❗  Don't forget to import and yield created saga in 'store/rootSaga.js'\n",
      });
    }

    return actions;
  },
};