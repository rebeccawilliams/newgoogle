// Get a list of CKAN portals.
// This runs in node, not in the browser.

var request = require('request')

function group(callback) {
  // List the CKAN group of entries in datacatologs.org.
  request('http://datacatalogs.org/api/rest/group/ckan', function(err, res, body) {
    callback(JSON.parse(body).packages)
  })
}
