const telnet = require('telnet-client');
const server = new telnet();

// connect to server
server.connect({
    host: "127.0.0.1",
    port: 4242
});
