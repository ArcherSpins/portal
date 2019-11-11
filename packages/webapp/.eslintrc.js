const path = require('path');

module.exports = {
  parser: "babel-eslint",
  env: {
    "browser": true,
    "es6": true
  },
  extends: [
    "airbnb",
    "plugin:flowtype/recommended",
    "plugin:jest/recommended"
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  plugins: ["react", "flowtype", "jest"],
  rules: {
    "linebreak-style": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "react/static-property-placement": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          ".storybook/**",
          "src/**/*.stories.js",
          "src/**/*.test.js"
        ]
      }
    ]
  },

  settings: {
    "import/resolver": {
      "node": {
        "paths": [ 
          path.resolve(__dirname, 'src') 
        ]
      },
      "eslint-import-resolver-lerna": {
        "packages": path.resolve(__dirname, '..')
      }
    }
  }
}
