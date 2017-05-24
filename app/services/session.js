import Ember from 'ember';

export default Ember.Service.extend({

  init() {
    this._super(...arguments);
    const savedToken = localStorage.getItem('booking-demo-token');
    if(savedToken) {
      this.set('token', savedToken);
    }
  },

  setToken(token) {
    this.set('token', token);
    localStorage.setItem('booking-demo-token', token);
  }
});
