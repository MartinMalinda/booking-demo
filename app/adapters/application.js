import DS from 'ember-data';
import Ember from 'ember';

const {inject,computed} = Ember;

export default DS.JSONAPIAdapter.extend({

  session: inject.service(),
  
  coalesceFindRequests: true,

  headers: computed('session.token', function(){
    return {
      token: this.get('session.token')
    };
  }),
});
