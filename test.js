const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');
const Customer = require('./models/customers');



describe('basic model tests', () => {
  it('can create a customer in the db and find it with mongoose syntax', (done) => {
    const customer = new Customer({item: 'Coke', quantity: 10, cost: 50}).save().then(newCustomer => {
      expect(newCustomer.item).to.equal('Coke');
      expect(newCustomer.quantity).to.equal(10);
      expect(newCustomer.cost).to.equal(50);
      done();
    });
  });
});

describe('basic api endpoint tests', () => {
  it('can access api endpoint and get sucess back', (done) => {
    request(app)
    .get('/api/sanity')
    .expect(200, {hello: 'hello'}, done);
  });
});

describe('sanity test', () => {
  it('should run test', () => {
    expect(1).to.equal(1);
  });
});

// db.dropdatabase
// it('can create a cat in the db and find it with mongoose syntax', (done) => {
//   const cat = new Cat({name: 'mittens', fluffiness: 10})
//   .save().then(newCat => {
//     expect(newCat.name).to.equal('mittens');
//     expect(newCat.fluffiness).to.equal(10);
//     done();
//   });
// });
// });
