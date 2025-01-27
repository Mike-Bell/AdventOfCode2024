const configureTechsmithLinting = require('eslint-config-techsmith');
const globals = require('globals');

module.exports = [
   ...configureTechsmithLinting(['node_modules/'], {
      ...globals.node,
      ...globals.jest
   }),
   {
      rules: {
         'no-console': 'off',
         'no-magic-numbers': 'off'
      }
   }
];