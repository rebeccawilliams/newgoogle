var request = require('browser-request')
var jsonp = require('dlite-jsonp');

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
exports.junar_portals = [
  // https://twitter.com/javierpajaro/status/363332649072336896
  'datos.gob.cl',
  'lima.datosabiertos.pe',
  'bahiablanca.opendata.junar.com',
  'recursos.penalolen.opendata.junar.com',
  'datosabiertos.gob.go.cr',

  // https://twitter.com/javierpajaro/status/363333894931628034
  'paloalto.opendata.junar.com',
  'cupertino.opendata.junar.com',
  'data.sanjoseca.gov',
  // 'sacramento.opendata.junar.com',

  // https://twitter.com/javierpajaro/status/363333894931628034
  'www.opendatalatinoamerica.org',
  'data.lanacion.com.ar',
  'infodatos.opendata.junar.com'
].filter(function(portal) {
  return portal.match('.opendata.junar.com')
})
exports.ckan_portals = [
  'datahub.io',
  'opendata.comune.bari.it',
  'africaopendata.org',
  'www.amsterdamopendata.nl/home',
  'opendata.aragon.es',
  'daten.berlin.de',
  'data.buenosaires.gob.ar',
  'ie.ckan.net',
  'it.ckan.net',
  'rs.ckan.net',
  'br.ckan.net',
  'datos.codeandomexico.org',
  'cz.ckan.net',
  'dados.gov.br',
  'dadosabertos.senado.gov.br',
  'dados.novohamburgo.rs.gov.br',
  'data.gv.at',
  'data.linz.gv.at',
  'fi.thedatahub.org',
  'data.norge.no',
  'data.sa.gov.au',
  'www.data.gc.ca',
  'data.gov.sk',
  'data.gov.uk/data',
  'data.qld.gov.au',
  'data.openpolice.ru',
  'datacatalogs.org',
  'www.datagm.org.uk',
  'datagov.ru',
  'datakilder.no',
  'datospublicos.org',
  'data.denvergov.org',
  'ckan.emap.fgv.br',
  'open-data.europa.eu',
  'www.healthdata.gov',
  'www.hri.fi',
  'data.graz.gv.at',
  'daten.hamburg.de',
  'data.codeforhouston.com',
  'iatiregistry.org',
  'data.klp.org.in',
  'thedatahub.kr',
  'www.nosdonnees.fr',
  'offenedaten.de',
  'data.opencolorado.org',
  'catalog.opendata.in.th',
  'www.opendatahub.it',
  'dati.trentino.it',
  'data.openva.com',
  'www.opendata-hro.de',
  'opengov.es',
  'data.ottawa.ca',
  'data.overheid.nl',
  'www.opendata.provincia.roma.it',
  'publicdata.eu',
  'www.daten.rlp.de',
  'www.rotterdamopendata.nl',
  'data.cityofsantacruz.com',
  'thedatahub.org',
  'dati.toscana.it'
]

exports.socrata = function(terms, portal, page) {
  var url = 'https://' + portal + '/api/search/views.json?limit=1&page=' + page + '&q=' + encodeURIComponent(terms);
  request(url, function(err, res, body) {
    var data = JSON.parse(body)
    if (data.count > 0){
      var view = data.results[0].view
      var url = 'http://' + portal + '/-/-/' + view.id
      var description = typeof(view.description) === 'undefined' ? '' : '<p>' + view.description + '</p>'
      return exports.render_result(portal, url, view.name, description)
    }
  })
}

exports.junar = function(terms, portal, page) {
  // paloalto.cloudapi.junar.com -> paloalto.opendata.junar.com
  var api = 'http://' + portal.replace('opendata.junar.com', 'cloudapi.junar.com')

  var api_key = 'ff5a9dcb0f57a994cdac1da7a1ce3c71264616df'
  var url = api + '/datastreams/search?query=' + encodeURIComponent(terms) + '&auth_key=' + api_key + '&max_results=' + page + '&callback=%3F'
  jsonp(url, function(data) {
    if (data && data.length > 0) {
      var view = data.pop()
      return exports.render_result(portal, view.link, view.title, view.description)
    }
  })
}

exports.ckan = function(terms, portal, page) {
  var url = 'http://' + portal + '/api/search/dataset?q=' + encodeURIComponent(terms) + '&start=' + page + '&rows=1'
  request(url, function(err, res, body) {
    if (!err) {
      var data = JSON.parse(body)
      if (data.results.length > 0){
        var id = data.results[0]
        request('http://' + portal + '/api/rest/dataset/' + id, function(err, res, body) {
          if (!err) {
            var dataset = JSON.parse(body)
            var url = 'http://' + portal + '/dataset/' + id
            return exports.render_result(portal, url, dataset.title, dataset.notes_rendered)
          }
        })
      }
    }
  })
}

exports.clear_result = function(portal) {
  document.getElementById(portal).setAttribute('style', 'display: none;')
  var a = document.querySelector('section[id="' + portal + '"] a')
  var em = document.querySelector('section[id="' + portal + '"] em')
  var desc = document.querySelector('section[id="' + portal + '"] .desc')

  a.innerText = ''
  desc.innerHTML = ''
  em.innerText = ''
}

exports.render_result = function(portal, href, name, description) {
  document.getElementById(portal).setAttribute('style', '')
  document.getElementById('loading').setAttribute('style', 'display: none;')
  document.querySelector('#search a').setAttribute('style', '')
  var a = document.querySelector('section[id="' + portal + '"] a')
  var em = document.querySelector('section[id="' + portal + '"] em')
  var desc = document.querySelector('section[id="' + portal + '"] .desc')

  a.href = href
  a.innerText = name
  desc.innerHTML = description
  em.innerText = portal
}

exports.portals = function() {
  return exports.socrata_portals.concat(exports.ckan_portals)
}

exports.search = function() {
  var url = [location.protocol, '//', location.host, location.pathname].join('')
  var hash = '/' + encodeURIComponent(exports.terms()) + '/' + exports.page
  window.location.hash = hash
  if (window._paq) {
    window._paq.push(['trackPageView', url + '#' + hash])
  }

  exports.portals().map(exports.clear_result)
  document.getElementById('loading').setAttribute('style', '')
  exports.socrata_portals.map(function(portal) {
    exports.socrata(exports.terms(), portal, exports.page)
  })
  exports.ckan_portals.map(function(portal) {
    exports.ckan(exports.terms(), portal, exports.page)
  })
}

exports.increment_page = function(increment) {
  exports.page += increment
  exports.search()
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

exports.portals().map(function(portal) {
  document.getElementById('result').innerHTML += '<section style="display: none;" id="' + portal + '" class="dataset"><h1><a href=""></a></h1><em class="portal"></em><div class="desc"></div></section>'
})

exports._prev_search_terms = exports.terms()
exports._prev_search_date  = new Date() // So it'll search the first time you press a key. A bit slow, but easy to code and nice feedback

exports.add_listener = function() {
  document.querySelector('#search > input[name="terms"]').addEventListener('keyup', function() {
    exports._prev_search_date = new Date()
    setTimeout(function() {
      var enough_time_passed = (new Date() - exports._prev_search_date) > 300
      var has_new_terms = exports._prev_search_terms !== exports.terms()
      if (enough_time_passed && has_new_terms && exports.terms() !== '') {
        exports.page = 1
        exports._prev_search_terms = exports.terms()

        exports.search()
      }
    }, 300)
  })
}

exports.main = function() {
  var path = window.location.hash.split('/')
  exports.add_listener()

  if (path.length === 3) {
    var search = path[1]
    var page = path[2]

    document.querySelector('#search > input[name="terms"]').value = decodeURIComponent(search)
    exports.page = (1 * page) || 1
    exports.search()
  } else {
    exports.page = 1
  }




  // Random placeholder
  var placeholders = [
     'arson, bus stops, campaigns, zoos, ...',
     'bus stops, restaurants, music, air quality' ,
     'farms, airports, hospitals, 311, ...', 
     'schools, sewers, shelters, spending, ...'
  ]
  var placeholder = placeholders[Math.floor(Math.random()*placeholders.length)]
  document.querySelector('input[name="terms"]').setAttribute('placeholder', placeholder)


}

window.openprism = exports
