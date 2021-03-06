import Ember from 'ember';

const {inject} = Ember;

export default Ember.Route.extend({

  session: inject.service(),

  beforeModel() {
    if(!this.get('session.token')) {
      this.transitionTo('login');
    }
  }
});
