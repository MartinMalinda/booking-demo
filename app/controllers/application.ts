import Ember from 'ember';
import {task} from 'ember-concurrency';

const {inject,computed} = Ember;

export default Ember.Controller.extend({
  session: inject.service(),
  ajax: inject.service(),

  isAuthenticated: computed.bool('session.token'),

  loginTask: task(function * (){
    let {token} = yield this.get('ajax').request('/getToken');
    this.get('session').setToken(token);
    this.transitionToRoute('index');
  }),

  actions: {
    login() {
      this.get('loginTask').perform();
    }
  }
});
