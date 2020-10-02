const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai

chai.use(chaiHttp)

it('Homepage access success', async () => {
    chai.request('https://a1-nookazon-backend.herokuapp.com/')
            .get('/')
            .end(function (err, res) {
                const result = res.statusCode
                expect(result).to.equal(404)
                
            });

  }).timeout(15000)

it('Product List connected', async () => {
  chai.request('https://a1-nookazon-backend.herokuapp.com/productlist')
          .get('/')
          .end(function (err, res) {
              const result = res.statusCode
              expect(result).to.equal(200)
              
          });

}).timeout(15000)
