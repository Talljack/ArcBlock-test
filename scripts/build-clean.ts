import * as rimraf from 'rimraf'

console.log('clean .blocklet folder')
rimraf.sync('.blocklet')
console.log('clean .blocklet folder done!')
