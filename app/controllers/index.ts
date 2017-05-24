import Ember from 'ember';
import BookingValidations from '../validations/booking';

const {computed, inject} = Ember;

export default Ember.Controller.extend({

  dateHelp: inject.service(),

  newBooking: {},
  serverErrors: [],
  BookingValidations,

  month: computed.alias('model.month'),
  year: computed.alias('model.year'),

  nextMonth: computed('month', function() {
    var currentMonth = this.get('month');
    if(currentMonth === 12) { return 1; }
    return currentMonth + 1;
  }),

  previousMonth: computed('month', function() {
    var currentMonth = Number(this.get('month'));
    if(currentMonth === 1) { return 12; }
    return currentMonth - 1;
  }),

  nextYear: computed('year', function() {
    return this.get('year') + 1;
  }),

  yearOfNextMonth: computed('month', 'year', function() {
    if(this.get('month') === 12) { return this.get('nextYear'); }
    return this.get('year');
  }),

  yearOfPreviousMonth: computed('month', 'year', function() {
    if(this.get('month') === 1) { return this.get('previousYear'); }
    return this.get('year');
  }),

  previousYear: computed('year', function() {
    return this.get('year') - 1;
  }),

  daysInMonth: computed('month','year', function() {
    return this.get('dateHelp').getDaysInMonth(this.get('year'), this.get('month'));
  }),

  columnDates: computed('daysInMonth', function() {
    var numberOfDays = this.get('daysInMonth');
    var columns = [];

    for(let i = 1;i <= numberOfDays; i++) {
      columns.push(new Date(this.get('year'), this.get('month') - 1, i));
    }

    return columns;
  }),

  actions: {
    saveBooking() {
      // Changeset has applied changes to the newBooking object
      let newBooking = this.store.createRecord('booking', this.get('newBooking')).save().then(() => {
        this.set('newBooking', {});
        this.set('serverErrors', []);
      }, errorResponse => {
        this.set('serverErrors', errorResponse.errors);
      });
    }
  }
});
