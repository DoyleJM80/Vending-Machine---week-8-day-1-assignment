const expect = require('chai').expect;
const request = require('supertest');
const app = require('./app');
const Customer = require('./models/customers');
const Vendor = require('./models/vendors');


describe('testing api endpoints', () => {
  beforeEach(done => {
    Vendor.insertMany([
      {item: 'Coke', quantity: 5, cost: 10},
      {item: 'Pepsi', quantity: 15, cost: 100},
      {item: 'Doctor Pepper', quantity: 1, cost: 1},
      {item: 'Mt Dew', quantity: 2, cost: 2}
    ]).then(done());
  });

  afterEach((done) => {
  Vendor.deleteMany({}).then(done());
  });

  it('vendor api endpoint returns all items as json', (done) => {
    request(app)
    .get('/api/vendor/items')
    .expect(200)
    .expect(res => {
      expect(res.body[0].item).to.equal('Coke');
      expect(res.body[1].item).to.equal('Pepsi');
      expect(res.body[2].item).to.equal('Doctor Pepper');
      expect(res.body[3].item).to.equal('Mt Dew');
    }).end(done);
  });
});

describe('testing api endpoints', () => {
  beforeEach(done => {
    Customer.insertMany([
      {item: 'Coke', quantity: 5, cost: 10},
      {item: 'Pepsi', quantity: 15, cost: 100},
      {item: 'Doctor Pepper', quantity: 1, cost: 1},
      {item: 'Mt Dew', quantity: 2, cost: 2}
    ]).then(done());
  });

  afterEach((done) => {
  Customer.deleteMany({}).then(done());
  });

  it('customer api endpoint returns all items as json', (done) => {
    request(app)
    .get('/api/customer/items')
    .expect(200)
    .expect(res => {
      expect(res.body[0].item).to.equal('Coke');
      expect(res.body[1].item).to.equal('Pepsi');
      expect(res.body[2].item).to.equal('Doctor Pepper');
      expect(res.body[3].item).to.equal('Mt Dew');
    }).end(done);
  });
});

describe('basic vendor tests', () => {
  afterEach((done) => {
  Vendor.deleteMany({}).then(done());
  });

  it('test should clean up after itself', (done) => {
    const vendor = new Vendor().save().then(newVendor => {
      Vendor.count().then(count => {
        expect(count).to.equal(1);
        done();
      });
    });
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

  it('test should clean up after itself', (done) => {
    const customer = new Customer().save().then(newCustomer => {
      Customer.count().then(count => {
        expect(count).to.equal(1);
        done();
      });
    });
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
