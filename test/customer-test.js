const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const Customer = require('../models/customers');
const Vendor = require('../models/vendors');



describe('select and pay for item', () => {

  beforeEach((done) => {
    Customer.insertMany([
      {item: 'Coke', quantity: 5, cost: 10},
      {item: 'Pepsi', quantity: 15, cost: 100},
      {item: 'Dr. Pepper', quantity: 1, cost: 1},
      {item: 'Mtn Dew', quantity: 2, cost: 2}
    ]).then(done());
  });

  afterEach((done) => {
    Customer.deleteMany({}).then(() => done());
    });

  // it('should allow a customer to pay and get change if needed', (done) => {
  //   request(app)
  //   .post('/api/customer')
  // });

  it('should make purchase from machine', (done) => {
    request(app)
    .post('/api/customer/items/Coke/purchases')
    .send({})
    .expect(201)
    .expect((res) => {
      Vendor.count().then((count) => {
        expect(count).to.equal(1);
      });
    }).end(done());
  });
});


describe('basic customer api endpoint tests', () => {

  beforeEach((done) => {
    Customer.insertMany([
      {item: 'Coke', quantity: 5, cost: 10},
      {item: 'Pepsi', quantity: 15, cost: 100},
      {item: 'Dr. Pepper', quantity: 1, cost: 1},
      {item: 'Mtn Dew', quantity: 2, cost: 2}
    ]).then(done());
  });

  afterEach((done) => {
    Customer.deleteMany({}).then(done());
    });

  it('customer api endpoint returns all items as json', (done) => {
    request(app)
    .get('/api/customer/items')
    .expect(200)
    .expect((res) => {
      expect(res.body[0].item).to.equal('Coke');
      expect(res.body[1].item).to.equal('Pepsi');
      expect(res.body[2].item).to.equal('Dr. Pepper');
      expect(res.body[3].item).to.equal('Mtn Dew');
    }).end(done);
  });
});


describe('basic customer tests', () => {
  afterEach((done) => {
    Customer.deleteMany({}).then(done());
    });

  it('customer test should clean up after itself', (done) => {
    const customer = new Customer().save().then((newCustomer) => {
      Customer.count().then((count) => {
        expect(count).to.equal(1);
        done();
      });
    });
  });


  it('can create a customer item in the db and find it with mongoose', (done) => {
    const customer = new Customer({item: 'Coke', quantity: 10, cost: 50}).save().then((newCustomer) => {
      expect(newCustomer.item).to.equal('Coke');
      expect(newCustomer.quantity).to.equal(10);
      expect(newCustomer.cost).to.equal(50);
      done();
    });
  });
});

describe('basic api endpoint tests', () => {
  it('can access api endpoints successfully', (done) => {
    request(app)
    .get('/api/sanity')
    .expect(200, {hello: 'hello'}, done);
  });
});

describe('sanity test', () => {
  it('should run this test',  ()=> {
    expect(1).to.not.equal(2);
  });
});



// A customer should be able to buy an item using money
// A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
// A customer should not be able to buy items that are not in the machine, but instead get an error
// ---------------TESTS DONE
// A customer should be able to get a list of the current items, their costs, and quantities of those items
