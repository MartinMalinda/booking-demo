import DS from 'ember-data';

const {attr, belongsTo} = DS;

export default DS.Model.extend({
  startAt: attr('date'),
  endAt: attr('date'),
  clientEmail: attr('string'),
  price: attr('number'),

  rental: belongsTo()
});
