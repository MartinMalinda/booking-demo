import { Factory, faker } from 'ember-cli-mirage';

let startDate = new Date(2017, 4, 1);
let endDate = new Date(2017, 4, 31);

export default Factory.extend({
  startAt() {
    return faker.date.between(startDate, endDate);
  },

  endAt() {
    return faker.date.between(this.startAt, endDate);
  },

  clientEmail() {
    return faker.internet.email();
  },

  price() {
    return faker.random.number({
      min: 0,
      max: 1000
    });
  }
});
