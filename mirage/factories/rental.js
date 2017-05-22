import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  name() {
    return faker.address.streetName();
  },

  dailyRate() {
    return faker.random.number({
      min: 10,
      max: 100
    });
  },

  // image() {
  //   return faker.image.city();
  // }
});
