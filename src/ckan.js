// Get a list of CKAN portals.
// This runs in node, not in the browser.

var request = require('request')

request('http://datacatalogs.org/api/rest/group/ckan', function(err, res, body) {
  console.log(body)
})
