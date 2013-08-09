var request = require('browser-request')

exports.socrata_portals = [
  'data.colorado.gov',
  'data.nola.gov',
  'healthmeasures.aspe.hhs.gov',
  'data.cityofchicago.org',
  'data.wa.gov',
  'opendata.go.ke',
  'data.austintexas.gov',
  'data.cityofnewyork.us',
  'info.samhsa.gov',
  'data.taxpayer.net',
  'data.cityofmadison.com',
  'data.slcgov.com',
  'data.illinois.gov',
  'data.somervillema.gov',
  'iranhumanrights.socrata.com',
  'data.hawaii.gov',
  'data.maryland.gov',
  'data.ny.gov',
  'data.mo.gov',
  'data.nfpa.org',
  'nmfs.socrata.com',
  'data.govloop.com',
  'data.sunlightlabs.com',
  'electionsdata.kingcounty.gov',
  'data.undp.org',
  'deleon.socrata.com',
  'data.energystar.gov',
  'explore.data.gov',
  'data.weatherfordtx.gov',
  'bronx.lehman.cuny.edu',
  'data.sfgov.org',
  'data.edmonton.ca',
  'data.consumerfinance.gov',
  'www.metrochicagodata.org',
  'data.kingcounty.gov',
  'data.baltimorecity.gov',
  'health.data.ny.gov',
  'dati.lombardia.it',
  'datacatalog.cookcountyil.gov',
  'www.opendatanyc.com',
  'cookcounty.socrata.com',
  'data.oregon.gov',
  'data.oaklandnet.com',
  'data.raleighnc.gov',
  'finances.worldbank.org',
  'data.honolulu.gov',
  'opendata.socrata.com',
  'data.cityofboston.gov',
  'data.ok.gov',
  'data.cms.gov',
  'data.snostat.org',
  'www.halifaxopendata.ca',
  'data.wellingtonfl.gov',
  'gettingpastgo.socrata.com',
  'www.data.act.gov.au',
  'data.redmond.gov',
  'data.seattle.gov',
  'data.montgomerycountymd.gov',
  'data.acgov.org',
  'data.medicare.gov'
]
exports.socrata_portals = []
exports.ckan_portals = [
  'datahub.io'
]

exports.socrata = function(terms, portal, page, callback) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms);
  request(url, function(err, res, body) {
    var results = JSON.parse(body).results
    if (results.length > 0){
      var view = results[0].view
      var url = 'http://' + portal + '/-/-/' + view.id
      return exports.render_result(portal, url, view.name, '<p>' + view.description + '</p>')
    }
  })
}

exports.ckan = function(terms, portal, page) {
  var url = 'http://' + portal + '/api/3/search/dataset?q=' + encodeURIComponent(terms) + '&start=' + page + '&rows=1'
  request(url, function(err, res, body) {
    var results = JSON.parse(body).results
    if (results.length > 0){
      var id = results[0]
      request('http://' + portal + '/api/rest/dataset/' + id, function(err, res, body) {
        var dataset = JSON.parse(body)
        var url = 'http://' + portal + '/dataset/' + id
        return exports.render_result(portal, url, dataset.title, dataset.notes_rendered)
      })
    }
  })
}

exports.clear_result = function(portal) {
  var a = document.querySelector('div[id="' + portal + '"] a')
  var em = document.querySelector('div[id="' + portal + '"] em')
  var desc = document.querySelector('div[id="' + portal + '"] .desc')

  a.innerText = ''
  desc.innerHTML = ''
  em.innerText = ''
}

exports.render_result = function(portal, href, name, description) {
  document.getElementById(portal).setAttribute('style', '')
  var a = document.querySelector('div[id="' + portal + '"] a')
  var em = document.querySelector('div[id="' + portal + '"] em')
  var desc = document.querySelector('div[id="' + portal + '"] .desc')

  a.href = href
  a.innerText = name
  desc.innerHTML = description
  em.innerText = portal
}

exports.portals = function() {
  return exports.socrata_portals.concat(exports.ckan_portals)
}

exports.search_portals = function() {
  exports.portals().map(exports.clear_result)
  document.querySelector('#search a').setAttribute('style', '')
  exports.socrata_portals.map(function(portal) {
    exports.socrata(exports.terms(), portal, exports.page)
  })
  exports.ckan_portals.map(function(portal) {
    exports.ckan(exports.terms(), portal, exports.page)
  })
}

exports.page = 1
exports.increment_page = function(increment) {
  exports.page += increment
  exports.search_portals(exports.page)
}
exports.next = function() {
  exports.increment_page(1)
}
exports.prev = function() {
  if (exports.page > 1) { exports.increment_page(-1) }
}


exports.terms = function() {
  return document.querySelector('#search > input[name="terms"]').value
}

window.openprism = exports

exports.portals().map(function(portal) {
  document.getElementById('result').innerHTML += '<div style="display: none;" id="' + portal + '" class="dataset"><h2><a href=""></a></h2><em class="portal"></em><div class="desc"></div></div>'
})

document.querySelector('#search > input[name="terms"]').addEventListener('change', function() {
  exports.page = 1
  exports.search_portals()
})
