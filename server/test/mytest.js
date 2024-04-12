let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
const { password } = require('pg/lib/defaults');
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
            console.log(res.body);
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

describe('/Register a user', () => {
    it('Should be able to register a user', async function () {
        try {
            const res = await chai.request(server)
                .post('/auth/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: makeid(5), password: 'testi' });

            console.log(res.body);
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.an('object');
            chai.expect(res.body).to.have.property('success').to.equal(true);
            chai.expect(res.body).to.have.property('message').to.equal('Käyttäjä rekisteröity onnistuneesti.');

        } catch (err) {
            throw new Error(err);
        }
    });
});