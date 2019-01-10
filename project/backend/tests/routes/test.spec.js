const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;
chai.use(chaiHttp);

describe('signIn', async function () {

    describe('LogUp users', async function () {
        let i = 0;
        beforeEach(async function () {
            const agent = chai.request.agent(this.app);
            this.response = await agent.post('/api/signup/').send({
                email: `test${++i}@example.com`,
                hash: 'password',
                firstName: 'test',
                secondName: 'test'

            });

        });
        it('Registration User 1', function () {
            expect(this.response).to.have.status(201);
        });
        it('Registration User 2', function () {
            expect(this.response).to.have.status(201);
        });

        it('Registration User 3', function () {
            expect(this.response).to.have.status(201);
        });


    });
});

describe('GET /profile ', async function () {
    describe('when not authenticated', async function () {
        before(async function () {
            this.response = await chai.request(this.app)
                .get(`/api/profile/`)
                .send();
        });

        it('should respond with 401', function () {
            expect(this.response).to.have.status(401);
        });

        it('should respond with correct message', function () {
            expect(this.response.text).to.equals('Unauthenticated');
        });
    });


    describe('when authenticated User1 must be available', async function () {
        before(async function () {
            // request.agent allows retaining cookies with each request
            const agent = chai.request.agent(this.app);
            await agent.post('/api/login/').send({
                email: 'test1@example.com',
                hash: 'password',
            });

            this.response = await agent
                .get(`/api/profile/`)

                .send();
        });

        it('should respond with 200', function () {
            expect(this.response).to.have.status(200);
        });

        it('should respond with correct body', function () {
            // console.log(JSON.stringify(this.response.body))
            expect(this.response.body.user).to.have.include({
                email: 'test1@example.com',
                hash: 'password',
                first_name: 'test',
                second_name: 'test',
                id: 1,

            });
        });
    });
});

describe('FriendsShip Events', async function () {
    describe('Add User to Friends', async function () {
        before(async function () {
            // request.agent allows retaining cookies with each request
            const agent = chai.request.agent(this.app);
            await agent.post('/api/login/').send({
                email: 'test1@example.com',
                hash: 'password',
            });

            this.response = await agent
                .get(`/api/users/2/beMyFriend/`)
            //.send();
        });

        it('should respond with 201', function () {
            expect(this.response).to.have.status(201);
        });

    });
    describe('Confirm Friends Request', async function () {
        before(async function () {
            // request.agent allows retaining cookies with each request
            const agent = chai.request.agent(this.app);
            await agent.post('/api/login/').send({
                email: 'test2@example.com',
                hash: 'password',
            });

            this.response = await agent
                .post(`/api/profile/friends/requests/1/response`)
                .send({status: 1});

            this.friendsResponse = await agent.get('/api/users/2/friends/');
        });

        it('should respond with 200', function () {
            expect(this.response).to.have.status(200);
        });

        it('user 1 should be in friends list', function () {
            console.log(JSON.stringify(this.friendsResponse.body));
            expect(this.friendsResponse).to.have.status(200);
            expect(this.friendsResponse.body[0]).to.have.includes({
                id: 1,
                first_name: "test",
                second_name: "test",
                email: "test1@example.com"
            });
        });

    });

    describe('Reject Friends Request', async function () {
        before(async function () {
            // request.agent allows retaining cookies with each request
            const agent = chai.request.agent(this.app);
            await agent.post('/api/login/').send({
                email: 'test2@example.com',
                hash: 'password',
            });

            this.response = await agent
                .post(`/api/profile/friends/requests/1/response`)
                .send({status: -1});
        });

        it('should respond with 200', function () {
            expect(this.response).to.have.status(200);
        });

    });
});


describe('Posts Events', async function () {


    describe('Add New, Get Post', async function () {
        before(async function () {
            const agent = chai.request.agent(this.app);
            await agent.post('/api/login/').send({
                email: 'test1@example.com',
                hash: 'password',
            });
            this.response = await agent.post('/api/profile/posts/')
                .send({text: "I like node.js"})

            this.postResponse = await agent.get('/api/users/1/posts/')
        });

        it('should respond with 201', function () {
            expect(this.response).to.have.status(201);
        });

        it('should respond with correct body', function () {
            expect(this.postResponse.body[0].text).to.have.includes("I like node.js");
            expect(this.postResponse.body[0].user_id).to.have.equals(1);
        });


    });

    describe('Feed', function () {

        before(async function () {
            const agent = chai.request.agent(this.app);
            await agent.post('/api/login/').send({
                email: 'test2@example.com',
                hash: 'password',
            });

            await agent
                .post(`/api/profile/friends/requests/1/response`)
                .send({status: 1})
                .end(async ()=>  this.feedResponse = await agent.get('/api/users/2/friends'))

            this.feedResponse = await agent.get('/api/feed')
        });

        it('should respond with 200', function () {
            expect(this.feedResponse).to.have.status(200);
        });

        it('should respond with correct body', function () {
            expect(this.feedResponse.body[0]).to.have.includes({user_id:1, text:'I like node.js'})
        });
    })


});

/*describe(`me/posts/`, function () {
    describe(`add post`,function () {
        before(async function () {
            const agent = chai.request.agent(this.app);
           this.response = agent.post(`/me/posts`).send({
                text: 'text'
            })
        })
        it('should ', function () {
            
        });
    })
    
})*/
