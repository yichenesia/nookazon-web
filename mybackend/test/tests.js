const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai

chai.use(chaiHttp)

it('Homepage access success', async () => {
    chai
            .request('http://localhost:5000')
            .get('/')
            .end(function (err, res) {
                const result = res.statusCode
                expect(result).to.equal(200)
                done()
            })
  }).timeout(15000)
