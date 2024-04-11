let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);

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