let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

describe('/GET users', ()=>{
    it('Should get all users', (done) => {
    chai.request(server)
        .get('/user/')
        .end((err,res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.a('array');
            done();
        })
    })
    it('Should have username', (done) => {
        chai.request(server)
            .get('/user/')
            .end((err,res) => {
                chai.expect(res.body).to.be.an('array').and.length.greaterThan(0);
                chai.expect(res.body[0]).have.property('username');
                done();
            })
        })
})

describe('/Register, login and delete user with right params', () => {
    it('Should be able to register a user', async function () {
        try {
            user = makeid(5);
            const res = await chai.request(server)
                .post('/auth/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: user, password: 'testi' });

            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body).to.have.property('success').to.equal(true);
            chai.expect(res.body).to.have.property('message').to.equal('Käyttäjä rekisteröity onnistuneesti.');

        } catch (err) {
            throw new Error(err);
        }
    });

    it('Should be able to login a user', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: user, password: 'testi' });

            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body).to.have.property('jwtToken');
            
        } catch (err) {
            throw new Error(err);
        }
    });

    it('Should be able to delete a user', async function () {
        try {
            const res = await chai.request(server)
                .post('/user/deleteuser')
                .set('content-type', 'application/x-www-form-urlencoded')
                .query({ username: user });

            chai.expect(res).to.have.status(200);

        } catch (err) {
            throw new Error(err);
        }
    }); 
});

describe('/Register, login, delete, access with wrong params', () => {

    it('Should reject registration without user', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: '', password: 'testi' });

            chai.expect(res).to.have.status(400); 
            chai.expect(res.body).to.have.property('success').to.equal(false);
            chai.expect(res.body).to.have.property('message').to.equal('Käyttäjänimi tai salasana puuttuu.');

        } catch (err) {
            throw new Error(err);
        }
    }); 

    it('Should reject registration without password', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: makeid(5), password: '' });

                chai.expect(res).to.have.status(400); 
                chai.expect(res.body).to.have.property('success').to.equal(false);
                chai.expect(res.body).to.have.property('message').to.equal('Käyttäjänimi tai salasana puuttuu.');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('Should reject login with incorrect username or password', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'nonexistentuser', password: 'incorrectpassword' });

            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.have.property('success').to.equal(false);
            chai.expect(res.body).to.have.property('message').to.equal("Käyttäjää ei löytynyt");
        } catch (err) {
            throw new Error(err);
        }
    });

    it('Should reject login without username', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ password: 'testi' });

            chai.expect(res).to.have.status(400); 
            chai.expect(res.body).to.have.property('success').to.equal(false);
            chai.expect(res.body).to.have.property('message').to.equal('Käyttäjänimi tai salasana puuttuu.');
        } catch (err) {
            throw new Error(err);
        }
    }); 

    it('Should reject login without password', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'testuser' });

                chai.expect(res).to.have.status(400); 
                chai.expect(res.body).to.have.property('success').to.equal(false);
                chai.expect(res.body).to.have.property('message').to.equal('Käyttäjänimi tai salasana puuttuu.');
        } catch (err) {
            throw new Error(err);
        }
    });

    it('Should not be able to delete a user that does not exist', async function () {
        try {
            const res = await chai.request(server)
                .post('/user/deleteuser')
                .set('content-type', 'application/x-www-form-urlencoded')
                .query({ username: "fakeuser5334" });

            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.have.property('success').to.equal(false);
            chai.expect(res.body).to.have.property('message').to.equal('Käyttäkää ei löydy');

        } catch (err) {
            throw new Error(err);
        }
    }); 


    it('Should reject access to authenticated routes without valid JWT token', async function () {
        try {
            const res = await chai.request(server)
                .get('/favourites')
                .set('Authorization', 'Bearer invalidJWTToken');

            chai.expect(res).to.have.status(403);
            chai.expect(res.body).to.have.property('error').to.equal('Access forbidden.');
        } catch (err) {
            throw new Error(err);
        }
    });
});
