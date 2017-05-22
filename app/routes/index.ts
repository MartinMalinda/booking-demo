import Ember from 'ember';

export default Ember.Route.extend({
  model() : Object {
    return {
      year: 2017,
      month: 5,
      rentals: this.store.findAll('rental')
    };
  }
});
