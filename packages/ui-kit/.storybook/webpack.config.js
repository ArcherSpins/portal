/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const postcssNormalize = require('postcss-normalize');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getCSSModuleLocalIdent = require('./getCssModuleLocalIdent');

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '../../' },
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          postcssNormalize(),
        ],
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    );
  }
  return loaders;
};

module.exports = async ({ config }) => {

  config.module.rules.push(
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: 'sass-loader',
    },
    {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
        },
        'sass-loader',
      ),
    },
    {
      test: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          modules: true,
        },
        'sass-loader',
      ),
    },
  );

  return config;
};
