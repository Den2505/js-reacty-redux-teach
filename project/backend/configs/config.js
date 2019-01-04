const bunyan = require('bunyan');

module.exports = {
    development: {
        db: {
            name: 'task4',
            username: 'root',
            password: 'root',
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            charset: 'utf8mb4'
        },
        logger: bunyan.createLogger({
            name: 'Social_Network',
            level: 'trace',
            streams: [{
                path: '/home/den/log/backend.log',
            }]

        })

    },
    test: {
        db: {
            name: 'task4_test',
            username: 'root',
            password: 'root',
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            charset: 'utf8mb4'
        },
        logger: bunyan.createLogger({
            name: 'Social Network',
            level: 'debug'
        })
    }
};

