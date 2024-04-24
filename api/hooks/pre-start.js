const isDevelopment = process.env.BLOCKLET_MODE === 'development'
console.log('idDevelopment', isDevelopment)
if (isDevelopment) {
  // rename `require` to skip deps resolve when bundling
  const r = require
  r('ts-node').register()
  r('../src/hooks/pre-start')
}
else {
  require('../dist/hooks/pre-start');
}
