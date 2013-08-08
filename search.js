var https = require('https')

exports.socrata = function(terms, portal, page, callback) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms);
  https.get(url, function(response) {
    console.log(response.statusCode)
    var data = JSON.parse(response.message)
    var view = data.results[0].view
    delete view.columns
    callback(view)
  })
}
