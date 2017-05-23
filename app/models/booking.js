import DS from 'ember-data';
import Ember from 'ember';

const {attr, belongsTo} = DS;
const {computed,inject} = Ember;

export default DS.Model.extend({

  dateHelp: inject.service(),

  startAt: attr('date'),
  endAt: attr('date'),
  clientEmail: attr('string'),
  price: attr('number'),

  rental: belongsTo(),

  daysLength: computed('startAt', 'endAt', function(){
    // return moment(this.get('endAt')).diff(this.get('startAt'), 'days');
    return this.get('dateHelp').dateDiff(this.get('startAt'), this.get('endAt'), true);
  }),
});
