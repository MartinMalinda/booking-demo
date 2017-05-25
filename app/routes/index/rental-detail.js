import Ember from 'ember';

export default Ember.Route.extend({
  model({id}) {

    if(id === 'new') {
      return this.store.createRecord('rental', {});
    }

    return this.store.find('reservation', id);
  },

  actions: {
    willTransition() {
      this.get('controller.model').rollbackAttributes();
    }
  }
});
