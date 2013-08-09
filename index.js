var request = require('browser-request')

exports.socrata = function(terms, portal, page, callback) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms);
  request(url, function(err, res, body) {
    var view = JSON.parse(body).results[0].view
    delete view.columns
    return callback(view)
  })
}

exports.page = 1
exports.increment_page = function(increment) {
  exports.page += increment
}
exports.next = function() {
  exports.increment_page(1)
}
exports.prev = function() {
  if (exports.page > 1) { exports.increment_page(-1) }
}

/*
exports.socrata('elevator', 'data.cityofnewyork.us', 1, function(view) {
})
*/

window.openprism = exports
