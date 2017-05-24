import Ember from 'ember';

const {computed,inject} = Ember;

const COL_WIDTH = 100;
const ROW_HEIGHT = 70;

export default Ember.Component.extend({
  
  classNames: ['booking-item'],
  attributeBindings: ['style'],

  dateHelp: inject.service(),

  x: computed('startAt', 'minDate', function(){
    return this.get('dateHelp').dateDiff(this.get('minDate'), this.get('startAt'), false) * COL_WIDTH;
  }),

  y: computed('rentalIndex', function(){
    return this.get('rentalIndex') * ROW_HEIGHT;
  }),

  width: computed('nightsLength', function(){
    return this.get('nightsLength') * COL_WIDTH;
  }),

  style: computed('x', 'width', function(){
    return Ember.String.htmlSafe(`width:${this.get('width')}px;transform:translate(${this.get('x')}px, ${this.get('y')}px)`);
  }),
});
