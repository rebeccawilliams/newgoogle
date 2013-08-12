var request = require('request')

for (var i = 0; i < 100; i++) {
  setTimeout(function(){
    request('http://community.junar.com/developer_manager/action_insert', function(err, res, body) {
      console.log(JSON.parse(body).pApiKey)
    })
  }, i * Math.random() * 1000)
}
