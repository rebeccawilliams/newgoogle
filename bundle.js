;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
exports.opendatasoft_portals = [
  'parisdata.opendatasoft.com',
  'datailedefrance.opendatasoft.com',
  'public.opendatasoft.com',
  'scisf.opendatasoft.com'
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

exports.junar_api_key = function() {
  var keys = [
    '9556a702147d641a32483f7221324273353abd76',
    '4910262054ffbfd089d9dc176dc98e5d2ece8468',
    'e41f93ee28eec1ac377936f37ad302a91a8a6e10',
    '26ffe5aa633fd12276e24e5ada93af08dd23b60f',
    '2f5be7ef1921417aa5cb5aebabd48fd54dddb521',
    '56633bd81bf47800a5e40c848a14d9914a4005d5',
    '1a406178389fb9f3054fb863c5c04e31e71a5270',
    'eea8b8509a861e1a45cc01a6125cb174f6d85e1d',
    'e8b9742757686bd760e1f9334e50e96b1ef38a92',
    '03111f4444c33fff844ce434e0fecb9f4f9379e9',
    'b82791cece03caa8f31fb59e98cefd81189c276c',
    'da782fcac90afb0a310f72a4f63baff6d26fc0b1',
    '16a764cdfcc53b477fdb840e39cfd230e4d1753d',
    'd11d722080adceef37ebbbad1ceeb32619ce1ba6',
    'b3e25bb953e3bb0cdd2044db50ba2dfcd660c766',
    'a36580d1a991bf8fe115b9218ea7da3b1b8ffafa',
    '3bee1d8aead2246c78903ea7920bff92b7792da7',
    '5b0869fb4c4952ae073eacd6feebcf0559fcb9c8',
    'b588631cd7d5deb3bd7d46ac7ae1378d2ad04159',
    '08835ac6e7d121e17882289b19aa437e0159f5ae',
    'b84a90aed31318bc64faf834374c011ad96bf6a2',
    '7d55cb9eff11f81d5716da60cc21b29ffb2ad295',
    '6a02f6d92590f38129bcb4e76d21913e17e606f7',
    '1b82255d444ed92c4b5181253303ddfe5dd0e5ff',
    'b011780564777e93dc948a092a0ed4dff35d09d1',
    'f75bb2b65e64d7174dc9c4a3e870c68ea1ce3943',
    '3754eb52273440765ebc7e206349237a63061229',
    'c36f8da1fb761a91e4d6bc3b006bd752d5711f1d',
    '59db4538b97f33aaeeac740400402e16c28cfd7e',
    '7caedb67198c650753bf5c596e1236d6b12e5f6d',
    '70fa27f948b151a061765de07b39a2dd9ee1555d',
    '73d2f6416b85dde8057589c363fb3b3dce253a57',
    'd4933cf177244b0b804ccc7eeeea1f2adb91741a',
    'aa034f6c6d7193f236c397ea4ca4c2993771f6d8',
    '2e1aa1d10d58a857c1c1549ac3b42cb43d2c25c2',
    '04f5e121714a5b533925aa96d2a156de7d9300eb',
    'bddd6724543317828c020137a14b0535a2f081c3',
    'c25b53da313b16ebe355aabbce6cc4df5f925ac3',
    '2d05372318fd217566e4cdc59be987924ebbd06f',
    'aad1bca7c4c5fce0970937bfcef3a80adaad5d02',
    'cb3a94484d2dc711aae268671fdda807874719ba',
    '60c17ab51cf931af96e90bbecc1e96651b4eac8e',
    'e3b5d021f25fba00696ae6d2237d099a01888262',
    '3e08311cc2fb9f793886dadc07ac58c902621454',
    'b047498e519b574fd771c9e30c12296534b0beb1',
    '674e3031c835f4a06edea41a44b6a735c57fdfd6',
    'ab4db215f0813bc360a5a3351ea5329b739b7eed',
    '3420a065aa79c022360245383602d50a35d6b4b7',
    'dadffe542147077503b072f8ff407b3d12137ced',
    'c0717bffc61f65aa9304ecfd4fb5868b896d6be0',
    '4cac102267fc299d32ee097f3a0b3cc1e1f62f17',
    '3dbfb62a66ceed413aab7cdc440f48a9e88bdcb7',
    'a881551d454cf911c717de80d0f8c4ac25d6c941',
    'a6f9e96447165e1faea4cc66295d87e326bb459a',
    '1cd0d65a7a9e6d6a6e4c5e99bf5b1d6205c17014',
    'c4e6c82cf2485008cd1ead49691a0bf27b73448d',
    '3ebfc06e4644fd2e64246807fe663eeae3f39448',
    '566f0a4deefc87eee86cbd33882504a00d58d55d',
    'be6f0dcd33bd84e42549355b1e797962d5d1afc9',
    '5b1d003bcb2306af8cb588eb630ff9c29ab50462',
    '0d47f928a8189c7ff510c3a4ef69c46ec9959533',
    '92e5008f3b9d2d044bd0d933930fab258dfda7fb',
    'f1e67144c052327cebaad80e8cfe2e2872c6dd7e',
    '136ed5eb7018cb167eba8a1ccc81a98b1eb88f4d',
    '4681b6d4045101256951ba10e56091d1833799cb',
    'a585bab20d71bfcd96fa529009a2e3656fae060b',
    '7be6606e81f72824826ca839fff36fa4d4c43ecf',
    '2dbe5fc096b42ed66e30ff9ed75764246bf52415',
    '3ce11c5786f03e7c02a615e3d4a9266c32ffc904',
    'db68d1ba3e5e71750cb516c0865aa0acc76cd502',
    '52935e771f0dc3fcce3ce3aea2ecd1caf3935f74',
    'f8655be7bb1c24aae04b5a9a2bd4ad843477c255',
    '38f9b91a2cda3d7fbc8bca72686b70067f559682',
    'decb10bcee62b6947315f54f15ae32abd40f8ee2',
    '519951eeb28ecd2f84603d26077ec20ca73e128b',
    '64b1a40396ea67f79fc5d9c8dfdeaa82f640f626',
    'ea85bc620aa04f0578c7ce175680b118888aef04',
    '542e2a45697b6a549ecce822a5be8b5b48941cd8',
    '87a7cfaa20da42037e035cf5458eec86cae3c753',
    '9d1c319e8f907aae54d2ebecc54c02233bf91efb',
    'dd3d83abe444f9e4bf798f874cc14466592889f3',
    '22f3a329f1a4442d0d7774314826572ed5f7abf2',
    '8c1a9daa9668829fa55aeb373d7f8011f42e624a',
    '42305ba3769f129ff42987227746bf869fdf10a7',
    'f049e352a4b3fc1d49c8c1ca04f2a7ee22f5f49e',
    '4c82d6c821196c01e67c409c8cfa17745b759b9b',
    '3f8c06515046fd2f37f9d2f0e9f1bef79dc6dc8f',
    '25607b5c390d584a5501509c254c58c576ac59ae',
    '616fd6accaf895251fdcad3fe7cd848cc84b54ec',
    '9c0bb9036bf1625d2222a427655b509ffd4f2611',
    '9fd1c6da129812c43f29bbe8560edc4ae641ebde',
    '903ec07597052e2ddfa65b41f904c32cb5040601',
    '590c3ee981c4a479f44f80a5535a66cab608ce2e',
    'b1dd85b46609c4558e899ec0b54a029a1421cd1c',
    '329f0046c2b4deb86680f2760d392657477509a6',
    'bd08630ebb31b3cb3ba697848d6315ea58bb81b9',
    '435a5d7b83ac83e1bac2366e86818f0460b0a58c',
    '16d8c3331b29728888edccf24576e520c2ee5354',
    'df1b94812c67d5dc25e19ee77d9f3ca920e08af6',
    'addda365a63c6d71999a5c112869ba9fa2d1aa5a',
    'cbe0c70f2552ac7f4fafd856c5aa6fbfbfe20aea',
    '518d0c178e498bc245c8b1541b44a6b144cd0416',
    'e95121cd5d273c305d07609a165f0ac1da1e03f7',
    '175049e9ea5032912a32483e197b93b8311de682',
    'fc42397e555644c2eac7dbd33b47cfaa17229a5b'
  ]
  return keys[Math.floor(Math.random()*keys.length)]
}

exports.junar = function(terms, portal, page) {
  // paloalto.cloudapi.junar.com -> paloalto.opendata.junar.com
  var api = 'http://' + portal.replace('opendata.junar.com', 'cloudapi.junar.com')

  var url = api + '/datastreams/search?query=' + encodeURIComponent(terms) + '&auth_key=' + exports.junar_api_key() + '&max_results=' + page + '&callback=%3F'
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

exports.opendatasoft = function(terms, portal, page) {
  var url = 'http://' + portal + '/api/datasets/1.0/search?rows=1&q=' + encodeURIComponent(terms) + '&start=' + page
  request(url, function(err, res, body) {
    if (!err) {
      var data = JSON.parse(body)
      if (data.nhits > 0) {
        var dataset = data.datasets[0]
        var datasetUrl = 'http://' + portal + '/explore/dataset/' + dataset.datasetid
        return exports.render_result(portal, datasetUrl, dataset.metas.title, dataset.metas.description)
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
  document.querySelector('#search a.next').setAttribute('style', '')
  document.querySelector('#search p.chrome').setAttribute('style', 'display: none;')
  var a = document.querySelector('section[id="' + portal + '"] a')
  var em = document.querySelector('section[id="' + portal + '"] em')
  var desc = document.querySelector('section[id="' + portal + '"] .desc')

  a.href = href
  a.innerText = name
  desc.innerHTML = description
  em.innerText = portal
}

exports.portals = function() {
  return exports.socrata_portals.concat(exports.junar_portals.concat(exports.ckan_portals.concat(exports.opendatasoft_portals)))
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
  exports.junar_portals.map(function(portal) {
    exports.junar(exports.terms(), portal, exports.page)
  })
  exports.ckan_portals.map(function(portal) {
    exports.ckan(exports.terms(), portal, exports.page)
  })
  exports.opendatasoft_portals.map(function(portal) {
    exports.opendatasoft(exports.terms(), portal, exports.page)
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

},{"browser-request":2,"dlite-jsonp":4}],2:[function(require,module,exports){
// Browser Request
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var xmlhttprequest = require('./xmlhttprequest')
if(!xmlhttprequest || typeof xmlhttprequest !== 'object')
  throw new Error('Could not find ./xmlhttprequest')

var XHR = xmlhttprequest.XMLHttpRequest
if(!XHR)
  throw new Error('Bad xmlhttprequest.XMLHttpRequest')
if(! ('_object' in (new XHR)))
  throw new Error('This is not portable XMLHttpRequest')

module.exports = request
request.XMLHttpRequest = XHR
request.log = getLogger()

var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

//
// request
//

function request(options, callback) {
  // The entry-point to the API: prep the options object and pass the real work to run_xhr.
  if(typeof callback !== 'function')
    throw new Error('Bad callback given: ' + callback)

  if(!options)
    throw new Error('No options given')

  var options_onResponse = options.onResponse; // Save this for later.

  if(typeof options === 'string')
    options = {'uri':options};
  else
    options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

  options.onResponse = options_onResponse // And put it back.

  if(options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if(!options.uri && options.uri !== "")
    throw new Error("options.uri is a required argument");

  if(typeof options.uri != "string")
    throw new Error("options.uri must be a string");

  var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
  for (var i = 0; i < unsupported_options.length; i++)
    if(options[ unsupported_options[i] ])
      throw new Error("options." + unsupported_options[i] + " is not supported")

  options.callback = callback
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  options.body    = options.body || null
  options.timeout = options.timeout || request.DEFAULT_TIMEOUT

  if(options.headers.host)
    throw new Error("Options.headers.host is not supported");

  if(options.json) {
    options.headers.accept = options.headers.accept || 'application/json'
    if(options.method !== 'GET')
      options.headers['content-type'] = 'application/json'

    if(typeof options.json !== 'boolean')
      options.body = JSON.stringify(options.json)
    else if(typeof options.body !== 'string')
      options.body = JSON.stringify(options.body)
  }

  // If onResponse is boolean true, call back immediately when the response is known,
  // not when the full request is complete.
  options.onResponse = options.onResponse || noop
  if(options.onResponse === true) {
    options.onResponse = callback
    options.callback = noop
  }

  // XXX Browsers do not like this.
  //if(options.body)
  //  options.headers['content-length'] = options.body.length;

  // HTTP basic authentication
  if(!options.headers.authorization && options.auth)
    options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

  return run_xhr(options)
}

var req_seq = 0
function run_xhr(options) {
  var xhr = new XHR
    , timed_out = false
    , is_cors = is_crossDomain(options.uri)
    , supports_cors = ('withCredentials' in xhr._object)

  req_seq += 1
  xhr.seq_id = req_seq
  xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
  xhr._id = xhr.id // I know I will type "_id" from habit all the time.

  if(is_cors && !supports_cors) {
    var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
    cors_err.cors = 'unsupported'
    return options.callback(cors_err, xhr)
  }

  xhr.timeoutTimer = setTimeout(too_late, options.timeout)
  function too_late() {
    timed_out = true
    var er = new Error('ETIMEDOUT')
    er.code = 'ETIMEDOUT'
    er.duration = options.timeout

    request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
    return options.callback(er, xhr)
  }

  // Some states can be skipped over, so remember what is still incomplete.
  var did = {'response':false, 'loading':false, 'end':false}

  xhr.onreadystatechange = on_state_change
  xhr.open(options.method, options.uri, true) // asynchronous
  if(is_cors)
    xhr._object.withCredentials = !! options.withCredentials
  xhr.send(options.body)
  return xhr

  function on_state_change(event) {
    if(timed_out)
      return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})

    request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})

    if(xhr.readyState === XHR.OPENED) {
      request.log.debug('Request started', {'id':xhr.id})
      for (var key in options.headers)
        xhr.setRequestHeader(key, options.headers[key])
    }

    else if(xhr.readyState === XHR.HEADERS_RECEIVED)
      on_response()

    else if(xhr.readyState === XHR.LOADING) {
      on_response()
      on_loading()
    }

    else if(xhr.readyState === XHR.DONE) {
      on_response()
      on_loading()
      on_end()
    }
  }

  function on_response() {
    if(did.response)
      return

    did.response = true
    request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
    clearTimeout(xhr.timeoutTimer)
    xhr.statusCode = xhr.status // Node request compatibility

    // Detect failed CORS requests.
    if(is_cors && xhr.statusCode == 0) {
      var cors_err = new Error('CORS request rejected: ' + options.uri)
      cors_err.cors = 'rejected'

      // Do not process this request further.
      did.loading = true
      did.end = true

      return options.callback(cors_err, xhr)
    }

    options.onResponse(null, xhr)
  }

  function on_loading() {
    if(did.loading)
      return

    did.loading = true
    request.log.debug('Response body loading', {'id':xhr.id})
    // TODO: Maybe simulate "data" events by watching xhr.responseText
  }

  function on_end() {
    if(did.end)
      return

    did.end = true
    request.log.debug('Request done', {'id':xhr.id})

    xhr.body = xhr.responseText
    if(options.json) {
      try        { xhr.body = JSON.parse(xhr.responseText) }
      catch (er) { return options.callback(er, xhr)        }
    }

    options.callback(null, xhr, xhr.body)
  }

} // request

request.withCredentials = false;
request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

//
// HTTP method shortcuts
//

var shortcuts = [ 'get', 'put', 'post', 'head' ];
shortcuts.forEach(function(shortcut) {
  var method = shortcut.toUpperCase();
  var func   = shortcut.toLowerCase();

  request[func] = function(opts) {
    if(typeof opts === 'string')
      opts = {'method':method, 'uri':opts};
    else {
      opts = JSON.parse(JSON.stringify(opts));
      opts.method = method;
    }

    var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
    return request.apply(this, args);
  }
})

//
// CouchDB shortcut
//

request.couch = function(options, callback) {
  if(typeof options === 'string')
    options = {'uri':options}

  // Just use the request API to do JSON.
  options.json = true
  if(options.body)
    options.json = options.body
  delete options.body

  callback = callback || noop

  var xhr = request(options, couch_handler)
  return xhr

  function couch_handler(er, resp, body) {
    if(er)
      return callback(er, resp, body)

    if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
      // The body is a Couch JSON object indicating the error.
      er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
      for (var key in body)
        er[key] = body[key]
      return callback(er, resp, body);
    }

    return callback(er, resp, body);
  }
}

//
// Utility
//

function noop() {}

function getLogger() {
  var logger = {}
    , levels = ['trace', 'debug', 'info', 'warn', 'error']
    , level, i

  for(i = 0; i < levels.length; i++) {
    level = levels[i]

    logger[level] = noop
    if(typeof console !== 'undefined' && console && console[level])
      logger[level] = formatted(console, level)
  }

  return logger
}

function formatted(obj, method) {
  return formatted_logger

  function formatted_logger(str, context) {
    if(typeof context === 'object')
      str += ' ' + JSON.stringify(context)

    return obj[method].call(obj, str)
  }
}

// Return whether a URL is a cross-domain request.
function is_crossDomain(url) {
  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

  // jQuery #8138, IE may throw an exception when accessing
  // a field from window.location if document.domain has been set
  var ajaxLocation
  try { ajaxLocation = location.href }
  catch (e) {
    // Use the href attribute of an A element since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    , parts = rurl.exec(url.toLowerCase() )

  var result = !!(
    parts &&
    (  parts[1] != ajaxLocParts[1]
    || parts[2] != ajaxLocParts[2]
    || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
    )
  )

  //console.debug('is_crossDomain('+url+') -> ' + result)
  return result
}

// MIT License from http://phpjs.org/functions/base64_encode:358
function b64_enc (data) {
    // Encodes string using MIME base64 algorithm
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

    if (!data) {
        return data;
    }

    // assume utf8 data
    // data = this.utf8_encode(data+'');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}

},{"./xmlhttprequest":3}],3:[function(require,module,exports){


!function(window) {
  if(typeof exports === 'undefined')
    throw new Error('Cannot find global "exports" object. Is this really CommonJS?')
  if(typeof module === 'undefined')
    throw new Error('Cannot find global "module" object. Is this really CommonJS?')
  if(!module.exports)
    throw new Error('Cannot find global "module.exports" object. Is this really CommonJS?')

  // Define globals to simulate a browser environment.
  window = window || {}

  var document = window.document || {}
  if(!window.document)
    window.document = document

  var navigator = window.navigator || {}
  if(!window.navigator)
    window.navigator = navigator

  if(!navigator.userAgent)
    navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22';

  // Remember the old values in window. If the inner code changes anything, export that as a module and restore the old window value.
  var win = {}
    , key

  for (key in window)
    if(window.hasOwnProperty(key))
      win[key] = window[key]

  run_code()

  for (key in window)
    if(window.hasOwnProperty(key))
      if(window[key] !== win[key]) {
        exports[key] = window[key]
        window[key] = win[key]
      }

  function run_code() {
    // Begin browser file: XMLHttpRequest.js
/**
* XMLHttpRequest.js Copyright (C) 2011 Sergey Ilinsky (http://www.ilinsky.com)
*
* This work is free software; you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation; either version 2.1 of the License, or
* (at your option) any later version.
*
* This work is distributed in the hope that it will be useful,
* but without any warranty; without even the implied warranty of
* merchantability or fitness for a particular purpose. See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this library; if not, write to the Free Software Foundation, Inc.,
* 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

(function () {

	// Save reference to earlier defined object implementation (if any)
	var oXMLHttpRequest = window.XMLHttpRequest;

	// Define on browser type
	var bGecko  = !!window.controllers;
	var bIE     = !!window.document.namespaces;
	var bIE7    = bIE && window.navigator.userAgent.match(/MSIE 7.0/);

	// Enables "XMLHttpRequest()" call next to "new XMLHttpRequest()"
	function fXMLHttpRequest() {
		this._object  = oXMLHttpRequest && !bIE7 ? new oXMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP");
		this._listeners = [];
	}

	// Constructor
	function cXMLHttpRequest() {
		return new fXMLHttpRequest;
	}
	cXMLHttpRequest.prototype = fXMLHttpRequest.prototype;

	// BUGFIX: Firefox with Firebug installed would break pages if not executed
	if (bGecko && oXMLHttpRequest.wrapped) {
		cXMLHttpRequest.wrapped = oXMLHttpRequest.wrapped;
	}

	// Constants
	cXMLHttpRequest.UNSENT            = 0;
	cXMLHttpRequest.OPENED            = 1;
	cXMLHttpRequest.HEADERS_RECEIVED  = 2;
	cXMLHttpRequest.LOADING           = 3;
	cXMLHttpRequest.DONE              = 4;

	// Interface level constants
	cXMLHttpRequest.prototype.UNSENT            = cXMLHttpRequest.UNSENT;
	cXMLHttpRequest.prototype.OPENED            = cXMLHttpRequest.OPENED;
	cXMLHttpRequest.prototype.HEADERS_RECEIVED  = cXMLHttpRequest.HEADERS_RECEIVED;
	cXMLHttpRequest.prototype.LOADING           = cXMLHttpRequest.LOADING;
	cXMLHttpRequest.prototype.DONE              = cXMLHttpRequest.DONE;

	// Public Properties
	cXMLHttpRequest.prototype.readyState    = cXMLHttpRequest.UNSENT;
	cXMLHttpRequest.prototype.responseText  = '';
	cXMLHttpRequest.prototype.responseXML   = null;
	cXMLHttpRequest.prototype.status        = 0;
	cXMLHttpRequest.prototype.statusText    = '';

	// Priority proposal
	cXMLHttpRequest.prototype.priority    = "NORMAL";

	// Instance-level Events Handlers
	cXMLHttpRequest.prototype.onreadystatechange  = null;

	// Class-level Events Handlers
	cXMLHttpRequest.onreadystatechange  = null;
	cXMLHttpRequest.onopen              = null;
	cXMLHttpRequest.onsend              = null;
	cXMLHttpRequest.onabort             = null;

	// Public Methods
	cXMLHttpRequest.prototype.open  = function(sMethod, sUrl, bAsync, sUser, sPassword) {
		// http://www.w3.org/TR/XMLHttpRequest/#the-open-method
		var sLowerCaseMethod = sMethod.toLowerCase();
		if (sLowerCaseMethod == "connect" || sLowerCaseMethod == "trace" || sLowerCaseMethod == "track") {
			// Using a generic error and an int - not too sure all browsers support correctly
			// http://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#securityerror, so, this is safer
			// XXX should do better than that, but this is OT to XHR.
			throw new Error(18);
		}

		// Delete headers, required when object is reused
		delete this._headers;

		// When bAsync parameter value is omitted, use true as default
		if (arguments.length < 3) {
			bAsync  = true;
		}

		// Save async parameter for fixing Gecko bug with missing readystatechange in synchronous requests
		this._async   = bAsync;

		// Set the onreadystatechange handler
		var oRequest  = this;
		var nState    = this.readyState;
		var fOnUnload = null;

		// BUGFIX: IE - memory leak on page unload (inter-page leak)
		if (bIE && bAsync) {
			fOnUnload = function() {
				if (nState != cXMLHttpRequest.DONE) {
					fCleanTransport(oRequest);
					// Safe to abort here since onreadystatechange handler removed
					oRequest.abort();
				}
			};
			window.attachEvent("onunload", fOnUnload);
		}

		// Add method sniffer
		if (cXMLHttpRequest.onopen) {
			cXMLHttpRequest.onopen.apply(this, arguments);
		}

		if (arguments.length > 4) {
			this._object.open(sMethod, sUrl, bAsync, sUser, sPassword);
		} else if (arguments.length > 3) {
			this._object.open(sMethod, sUrl, bAsync, sUser);
		} else {
			this._object.open(sMethod, sUrl, bAsync);
		}

		this.readyState = cXMLHttpRequest.OPENED;
		fReadyStateChange(this);

		this._object.onreadystatechange = function() {
			if (bGecko && !bAsync) {
				return;
			}

			// Synchronize state
			oRequest.readyState   = oRequest._object.readyState;
			fSynchronizeValues(oRequest);

			// BUGFIX: Firefox fires unnecessary DONE when aborting
			if (oRequest._aborted) {
				// Reset readyState to UNSENT
				oRequest.readyState = cXMLHttpRequest.UNSENT;

				// Return now
				return;
			}

			if (oRequest.readyState == cXMLHttpRequest.DONE) {
				// Free up queue
				delete oRequest._data;

				// Uncomment these lines for bAsync
				/**
				 * if (bAsync) {
				 * 	fQueue_remove(oRequest);
				 * }
				 */

				fCleanTransport(oRequest);

				// Uncomment this block if you need a fix for IE cache
				/**
				 * // BUGFIX: IE - cache issue
				 * if (!oRequest._object.getResponseHeader("Date")) {
				 * 	// Save object to cache
				 * 	oRequest._cached  = oRequest._object;
				 *
				 * 	// Instantiate a new transport object
				 * 	cXMLHttpRequest.call(oRequest);
				 *
				 * 	// Re-send request
				 * 	if (sUser) {
				 * 		if (sPassword) {
				 * 			oRequest._object.open(sMethod, sUrl, bAsync, sUser, sPassword);
				 * 		} else {
				 * 			oRequest._object.open(sMethod, sUrl, bAsync);
				 * 		}
				 *
				 * 		oRequest._object.setRequestHeader("If-Modified-Since", oRequest._cached.getResponseHeader("Last-Modified") || new window.Date(0));
				 * 		// Copy headers set
				 * 		if (oRequest._headers) {
				 * 			for (var sHeader in oRequest._headers) {
				 * 				// Some frameworks prototype objects with functions
				 * 				if (typeof oRequest._headers[sHeader] == "string") {
				 * 					oRequest._object.setRequestHeader(sHeader, oRequest._headers[sHeader]);
				 * 				}
				 * 			}
				 * 		}
				 * 		oRequest._object.onreadystatechange = function() {
				 * 			// Synchronize state
				 * 			oRequest.readyState   = oRequest._object.readyState;
				 *
				 * 			if (oRequest._aborted) {
				 * 				//
				 * 				oRequest.readyState = cXMLHttpRequest.UNSENT;
				 *
				 * 				// Return
				 * 				return;
				 * 			}
				 *
				 * 			if (oRequest.readyState == cXMLHttpRequest.DONE) {
				 * 				// Clean Object
				 * 				fCleanTransport(oRequest);
				 *
				 * 				// get cached request
				 * 				if (oRequest.status == 304) {
				 * 					oRequest._object  = oRequest._cached;
				 * 				}
				 *
				 * 				//
				 * 				delete oRequest._cached;
				 *
				 * 				//
				 * 				fSynchronizeValues(oRequest);
				 *
				 * 				//
				 * 				fReadyStateChange(oRequest);
				 *
				 * 				// BUGFIX: IE - memory leak in interrupted
				 * 				if (bIE && bAsync) {
				 * 					window.detachEvent("onunload", fOnUnload);
				 * 				}
				 *
				 * 			}
				 * 		};
				 * 		oRequest._object.send(null);
				 *
				 * 		// Return now - wait until re-sent request is finished
				 * 		return;
				 * 	};
				 */

				// BUGFIX: IE - memory leak in interrupted
				if (bIE && bAsync) {
					window.detachEvent("onunload", fOnUnload);
				}

				// BUGFIX: Some browsers (Internet Explorer, Gecko) fire OPEN readystate twice
				if (nState != oRequest.readyState) {
					fReadyStateChange(oRequest);
				}

				nState  = oRequest.readyState;
			}
		};
	};

	cXMLHttpRequest.prototype.send = function(vData) {
		// Add method sniffer
		if (cXMLHttpRequest.onsend) {
			cXMLHttpRequest.onsend.apply(this, arguments);
		}

		if (!arguments.length) {
			vData = null;
		}

		// BUGFIX: Safari - fails sending documents created/modified dynamically, so an explicit serialization required
		// BUGFIX: IE - rewrites any custom mime-type to "text/xml" in case an XMLNode is sent
		// BUGFIX: Gecko - fails sending Element (this is up to the implementation either to standard)
		if (vData && vData.nodeType) {
			vData = window.XMLSerializer ? new window.XMLSerializer().serializeToString(vData) : vData.xml;
			if (!this._headers["Content-Type"]) {
				this._object.setRequestHeader("Content-Type", "application/xml");
			}
		}

		this._data = vData;

		/**
		 * // Add to queue
		 * if (this._async) {
		 * 	fQueue_add(this);
		 * } else { */
		fXMLHttpRequest_send(this);
		 /**
		 * }
		 */
	};

	cXMLHttpRequest.prototype.abort = function() {
		// Add method sniffer
		if (cXMLHttpRequest.onabort) {
			cXMLHttpRequest.onabort.apply(this, arguments);
		}

		// BUGFIX: Gecko - unnecessary DONE when aborting
		if (this.readyState > cXMLHttpRequest.UNSENT) {
			this._aborted = true;
		}

		this._object.abort();

		// BUGFIX: IE - memory leak
		fCleanTransport(this);

		this.readyState = cXMLHttpRequest.UNSENT;

		delete this._data;

		/* if (this._async) {
	 	* 	fQueue_remove(this);
	 	* }
	 	*/
	};

	cXMLHttpRequest.prototype.getAllResponseHeaders = function() {
		return this._object.getAllResponseHeaders();
	};

	cXMLHttpRequest.prototype.getResponseHeader = function(sName) {
		return this._object.getResponseHeader(sName);
	};

	cXMLHttpRequest.prototype.setRequestHeader  = function(sName, sValue) {
		// BUGFIX: IE - cache issue
		if (!this._headers) {
			this._headers = {};
		}

		this._headers[sName]  = sValue;

		return this._object.setRequestHeader(sName, sValue);
	};

	// EventTarget interface implementation
	cXMLHttpRequest.prototype.addEventListener  = function(sName, fHandler, bUseCapture) {
		for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++) {
			if (oListener[0] == sName && oListener[1] == fHandler && oListener[2] == bUseCapture) {
				return;
			}
		}

		// Add listener
		this._listeners.push([sName, fHandler, bUseCapture]);
	};

	cXMLHttpRequest.prototype.removeEventListener = function(sName, fHandler, bUseCapture) {
		for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++) {
			if (oListener[0] == sName && oListener[1] == fHandler && oListener[2] == bUseCapture) {
				break;
			}
		}

		// Remove listener
		if (oListener) {
			this._listeners.splice(nIndex, 1);
		}
	};

	cXMLHttpRequest.prototype.dispatchEvent = function(oEvent) {
		var oEventPseudo  = {
			'type':             oEvent.type,
			'target':           this,
			'currentTarget':    this,
			'eventPhase':       2,
			'bubbles':          oEvent.bubbles,
			'cancelable':       oEvent.cancelable,
			'timeStamp':        oEvent.timeStamp,
			'stopPropagation':  function() {},  // There is no flow
			'preventDefault':   function() {},  // There is no default action
			'initEvent':        function() {}   // Original event object should be initialized
		};

		// Execute onreadystatechange
		if (oEventPseudo.type == "readystatechange" && this.onreadystatechange) {
			(this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [oEventPseudo]);
		}


		// Execute listeners
		for (var nIndex = 0, oListener; oListener = this._listeners[nIndex]; nIndex++) {
			if (oListener[0] == oEventPseudo.type && !oListener[2]) {
				(oListener[1].handleEvent || oListener[1]).apply(this, [oEventPseudo]);
			}
		}

	};

	//
	cXMLHttpRequest.prototype.toString  = function() {
		return '[' + "object" + ' ' + "XMLHttpRequest" + ']';
	};

	cXMLHttpRequest.toString  = function() {
		return '[' + "XMLHttpRequest" + ']';
	};

	/**
	 * // Queue manager
	 * var oQueuePending = {"CRITICAL":[],"HIGH":[],"NORMAL":[],"LOW":[],"LOWEST":[]},
	 * aQueueRunning = [];
	 * function fQueue_add(oRequest) {
	 * 	oQueuePending[oRequest.priority in oQueuePending ? oRequest.priority : "NORMAL"].push(oRequest);
	 * 	//
	 * 	setTimeout(fQueue_process);
	 * };
	 *
	 * function fQueue_remove(oRequest) {
	 * 	for (var nIndex = 0, bFound = false; nIndex < aQueueRunning.length; nIndex++)
	 * 	if (bFound) {
	 * 		aQueueRunning[nIndex - 1] = aQueueRunning[nIndex];
	 * 	} else {
	 * 		if (aQueueRunning[nIndex] == oRequest) {
	 * 			bFound  = true;
	 * 		}
	 * }
	 *
	 * 	if (bFound) {
	 * 		aQueueRunning.length--;
	 * 	}
	 *
	 *
	 * 	//
	 * 	setTimeout(fQueue_process);
	 * };
	 *
	 * function fQueue_process() {
	 * if (aQueueRunning.length < 6) {
	 * for (var sPriority in oQueuePending) {
	 * if (oQueuePending[sPriority].length) {
	 * var oRequest  = oQueuePending[sPriority][0];
	 * oQueuePending[sPriority]  = oQueuePending[sPriority].slice(1);
	 * //
	 * aQueueRunning.push(oRequest);
	 * // Send request
	 * fXMLHttpRequest_send(oRequest);
	 * break;
	 * }
	 * }
	 * }
	 * };
	 */

	// Helper function
	function fXMLHttpRequest_send(oRequest) {
		oRequest._object.send(oRequest._data);

		// BUGFIX: Gecko - missing readystatechange calls in synchronous requests
		if (bGecko && !oRequest._async) {
			oRequest.readyState = cXMLHttpRequest.OPENED;

			// Synchronize state
			fSynchronizeValues(oRequest);

			// Simulate missing states
			while (oRequest.readyState < cXMLHttpRequest.DONE) {
				oRequest.readyState++;
				fReadyStateChange(oRequest);
				// Check if we are aborted
				if (oRequest._aborted) {
					return;
				}
			}
		}
	}

	function fReadyStateChange(oRequest) {
		// Sniffing code
		if (cXMLHttpRequest.onreadystatechange){
			cXMLHttpRequest.onreadystatechange.apply(oRequest);
		}


		// Fake event
		oRequest.dispatchEvent({
			'type':       "readystatechange",
			'bubbles':    false,
			'cancelable': false,
			'timeStamp':  new Date + 0
		});
	}

	function fGetDocument(oRequest) {
		var oDocument = oRequest.responseXML;
		var sResponse = oRequest.responseText;
		// Try parsing responseText
		if (bIE && sResponse && oDocument && !oDocument.documentElement && oRequest.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) {
			oDocument = new window.ActiveXObject("Microsoft.XMLDOM");
			oDocument.async       = false;
			oDocument.validateOnParse = false;
			oDocument.loadXML(sResponse);
		}

		// Check if there is no error in document
		if (oDocument){
			if ((bIE && oDocument.parseError !== 0) || !oDocument.documentElement || (oDocument.documentElement && oDocument.documentElement.tagName == "parsererror")) {
				return null;
			}
		}
		return oDocument;
	}

	function fSynchronizeValues(oRequest) {
		try { oRequest.responseText = oRequest._object.responseText;  } catch (e) {}
		try { oRequest.responseXML  = fGetDocument(oRequest._object); } catch (e) {}
		try { oRequest.status       = oRequest._object.status;        } catch (e) {}
		try { oRequest.statusText   = oRequest._object.statusText;    } catch (e) {}
	}

	function fCleanTransport(oRequest) {
		// BUGFIX: IE - memory leak (on-page leak)
		oRequest._object.onreadystatechange = new window.Function;
	}

	// Internet Explorer 5.0 (missing apply)
	if (!window.Function.prototype.apply) {
		window.Function.prototype.apply = function(oRequest, oArguments) {
			if (!oArguments) {
				oArguments  = [];
			}
			oRequest.__func = this;
			oRequest.__func(oArguments[0], oArguments[1], oArguments[2], oArguments[3], oArguments[4]);
			delete oRequest.__func;
		};
	}

	// Register new object with window
	window.XMLHttpRequest = cXMLHttpRequest;

})();

    // End browser file: XMLHttpRequest.js
  }
}(typeof window !== 'undefined' ? window : {});

},{}],4:[function(require,module,exports){
module.exports = function(url, cb) {
  var id = 'j' + (Math.random() * (1<<30)).toString(16).replace('.', '')
    , script = document.createElement('script')

  window._jsonp_callbacks[id] = function(res) {
    cb && cb(res)
    delete window._jsonp_callbacks[id]
    script.parentNode.removeChild(script)
  }

  script.src = url.replace('callback=%3F', 'callback=_jsonp_callbacks.' + id)
  document.getElementsByTagName('head')[0].appendChild(script)
}
window._jsonp_callbacks = {}

},{}]},{},[1])
;