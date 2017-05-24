import { Factory, faker } from 'ember-cli-mirage';

let startDate = new Date(2017, 4, 1);
let endDate = new Date(2017, 4, 31);

export default Factory.extend({
  startAt() {
    return faker.date.between(startDate, endDate);
  },

  endAt() {
    const newDate = new Date(this.startAt);
    newDate.setDate(newDate.getDate() + 1);
    return faker.date.between(newDate, endDate);
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
