var request = require('browser-request')

exports.socrata = function(terms, portal, page, callback) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms);
  request(url, function(err, res, body) {
    var view = JSON.parse(body).results[0].view
    delete view.columns
    return callback(view)
  })
}


/*
exports.socrata('elevator', 'data.cityofnewyork.us', 1, function(view) {
})
*/

window.openprism = exports
