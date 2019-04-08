const telnet = require('telnet-client');
const server = new telnet();

// connect to server
server.connect({
    host: "127.0.0.1",
    port: 4242
});
var text = "test123";
function sendSms(){
  server.write("subscriber id 1 sms sender id 1 send " + text);
}
modules.export.sendSms = sendSms;
