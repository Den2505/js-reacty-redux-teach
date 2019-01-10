const app = require('../../app');

before(async function() {

    this.timeout(20000);
    this.app = await await app;
});