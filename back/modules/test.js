const CryptoJS = require('crypto-js')
const {KEY} = require('./key')


const textD = CryptoJS.AES.decrypt('U2FsdGVkX1/EQP1Y4tXrIpvR5PDrfTZELo9SJ9WfVQQ=', KEY()).toString(CryptoJS.enc.Utf8)
console.log(textD)