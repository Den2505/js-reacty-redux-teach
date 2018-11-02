`use strict`;
let Server = require(`./server`);





function run() {
    let myServer;
    let url = {};
    if (process.env.PORT != undefined) {
        url.port = process.env.PORT;
    }
    myServer = new Server(url);
    myServer.start();
}

run();