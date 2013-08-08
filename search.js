var d3 = require('d3')

exports.socrata = function(terms, portal, page, callback) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms)
  d3.json(url, function(result) {
    var view = result.results[0].view
    delete view.columns
    callback(view)
  })
}
