const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;
chai.use(chaiHttp);

describe('LOGUP', async function () {

    describe('LogUp users', async function () {
        let i = 0;
        beforeEach(async function () {
            const agent = chai.request.agent(this.app);
            this.response = await agent.post('/logup/').send({
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

describe('GET /me ', function () {
    describe('when not authenticated', function () {
        before(async function () {
            this.response = await chai.request(this.app)
                .get(`/me`)
                .send();
        });

        it('should respond with 401', function () {
            expect(this.response).to.have.status(401);
        });

        it('should respond with correct message', function () {
            expect(this.response.text).to.equals('Unauthenticated');
        });
    });


    describe('when authenticated by User1 must be available', function () {
        before(async function () {
            // request.agent allows retaining cookies with each request
            const agent = chai.request.agent(this.app);
            await agent.post('/login').send({
                email: 'test1@example.com',
                hash: 'password',
            });
            this.response = await agent
                .get(`/me`)
                .send();
        });

        it('should respond with 200', function () {
            expect(this.response).to.have.status(200);
        });

        it('should respond with correct body', function () {
            expect(this.response.body).to.contains({
                email: 'test1@example.com',
                hash: 'password',
                first_name: 'test',
                second_name: 'test',
                id: 1,
            });
        });
    });
});

describe(`me/posts/`, function () {
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
    
})
