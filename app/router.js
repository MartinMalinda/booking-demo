import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('booking');
  this.route('login');

  this.route('index', {path: '/'}, function() {
    this.route('index', {path: '/'})
    this.route('booking-detail', {path: '/booking/:id'});
    this.route('rental-detail', {path: '/rental/:id'});
  });
  this.route('rental');
});

export default Router;
