var memoize = require('memoizee')
var search  = require('./search.js')

exports.socrata = memoize(search.socrata, {async:true})
