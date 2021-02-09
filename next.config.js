/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const customEnviromentVariables = require('dotenv').config({
  path: path.join('src', 'config', `.env.${process.env.NODE_ENV}`),
}).parsed;

module.exports = {
  publicRuntimeConfig: {
    staticFolder: '/src/public',
  },
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  env: customEnviromentVariables,
  async rewrites() {
    return [
      {
        source: '/intellilogs/searchCalls',
        destination: '/api/intellilogs/index',
      },
    ];
  },
  serverRuntimeConfig: {
    TEMPLATES_FOLDER: path.join(
      __dirname,
      'src',
      'features',
      'common',
      'templates'
    ),
  },
};
