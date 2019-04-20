const teletype = require('teletype')

// osmonitbTelnet.exec("subscriber id "+id+" sms sender id 1 send blub" + text)

function sendSms(id, text){
  const client = teletype('localhost',4242)
  client.exec("subscriber id "+id+" sms sender id 1 send "+text)
    .then(response => {
      client.close();
    })
    .catch(function(error) {
      console.log(error);
    })
}
module.exports.sendSms=sendSms;
