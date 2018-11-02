`use strict`;

Users = require(`./user`);

class MyServer {

    constructor({ip = `127.0.0.1`, port = 8000}) {
        this.ip = ip;
        this.port = port;
        this.users = new Users();

    }

    start() {
        const http = require('http');
        const url = require('url');
        const server = new http.Server();
        server.on('request', (request, response) => {
            if (request.method === `GET` && request.url === `/users/`) {
                try {
                    console.log(request.url);
                    response.setHeader('Users', 'application/json');
                    response.statusCode = 200;
                    response.write(JSON.stringify(this.users.getAllUsers()));
                }
                catch (e) {
                    console.error(e.message);
                    console.error(e.errorCode);
                    response.write(e.message);
                }
                finally {
                    response.end();
                }

            }
            else if (request.method === `POST` && request.url === `/users/`) {

                let postData = ``;
                request.on('data', (data) => {
                    postData += data;
                });
                request.on(`end`, () => {
                    try {
                        console.log(request.url);
                        console.log(request.method);
                        console.log(`postData: ${postData}`);
                        let userData = JSON.parse(postData);
                        this.users.addUser(userData);
                        response.statusCode = 201;
                    }
                    catch (e) {
                        console.error(e.message);
                        console.error(e.errorCode);
                        // console.log(e.stack);
                        response.statusCode = 404;
                        response.write(e.message);
                    }
                    finally {
                        response.end();
                    }
                });

            }
            else if (request.method === "GET" && request.url.match(/\/users\/\d+\W\g/) !== null) {
                let id = request.url.match(/\d+/);
                try {
                    response.write(JSON.stringify(this.users.getUserById(id)));
                }
                catch (e) {
                    if (e.hasOwnProperty("statusCode")) {
                        response.statusCode = e.statusCode;
                        response.write(e.message);
                    }
                    else {
                        response.statusCode = 404;
                    }
                }
                response.end();
            }
            else if (request.method === `PUT` && request.url.match(/\/users\/\d/) !== null) {
                let id = request.url.match(/\d+/);
                let putData = ``;
                request.on(`data`, (data) => {
                    putData += data;
                });
                request.on(`end`, () => {
                    try {
                        putData = JSON.parse(putData);
                        console.log(putData);
                        console.log(`userId = ${id}`);
                        this.users.updateUser(id, putData);
                    }
                    catch (e) {
                        if (e.hasOwnProperty("statusCode")) {
                            response.statusCode = e.statusCode;
                            response.write(e.message);
                        }
                        else {
                            response.statusCode = 404;
                        }
                    }
                    finally {
                        response.end();
                    }

                });

            }
            else if (request.method === `DELETE` && request.url.match(/\/users\/\d/) !== null) {
                let id = request.url.match(/\d+/);
                try {
                    this.users.deleteUserById(id);
                    response.statusCode = 201;
                }
                catch (e) {
                    if (e.hasOwnProperty("statusCode")) {
                        response.statusCode = e.statusCode;
                        response.write(e.message);
                    }
                    else {
                        response.statusCode = 404;
                    }
                }

                finally {
                    response.end();
                }

            }
            else {
                response.statusCode = 404;
                response.end();
            }
        });
        server.listen(this.port, this.ip);
        console.log(`Server is running on ${this.ip}:${this.port}`);
    }

}

module.exports = MyServer;