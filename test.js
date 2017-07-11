const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');
const Customer = require('./models/customers');
const Vendor = require('./models/vendors');


describe('basic vendor tests', () => {

  afterEach((done) => {
  Vendor.deleteMany({}).then(done());
  });

  it('can create a vendor in the db and find it with mongoose syntax', (done) => {
    const vendor = new Vendor({item: 'Coke', quantity: 2, cost: 50}).save().then(newVendor => {
      expect(newVendor.item).to.equal('Coke');
      expect(newVendor.quantity).to.equal(2);
      expect(newVendor.cost).to.equal(50);
      done();
    });
  });
});



describe('basic customer tests', () => {

  afterEach((done) => {
  Customer.deleteMany({}).then(done());
  });

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
