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
        }
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
        }
    }
};

