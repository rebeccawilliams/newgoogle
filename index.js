var memoize = require('memoizee')
var search  = require('./search.js')

var socrata = memoize(search.socrata, {async:true})
