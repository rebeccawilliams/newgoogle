// Get a list of CKAN portals.
// This runs in node, not in the browser.

var request = require('request')

function group(callback) {
  // List the CKAN group of entries in datacatologs.org.
  request('http://datacatalogs.org/api/rest/group/ckan', function(err, res, body) {
    callback(JSON.parse(body).packages)
  })
}

function dataset(id, callback) {
  request('http://datacatalogs.org/api/rest/dataset/' + id, function(err, res, body) {
    var dataset = JSON.parse(body)
    callback(dataset)
  })
}

function main() {
  group(function(packages) {
    packages.map(function(p) {
      dataset(p, function(metadata) {
        console.log(metadata.url)
      })
    })
  })
}

main()
