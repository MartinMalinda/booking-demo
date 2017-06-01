import Ember from 'ember';

const {computed, $} = Ember;

//TODO: import this
const COL_WIDTH = 100;
const ROW_HEIGHT = 70;

export default Ember.Component.extend({

  classNames: ['calendar-area'],

  rentalsColumnStyle: computed('scrollLeft', function(){
    let scrollLeft = this.get('scrollLeft');
    return Ember.String.htmlSafe(`transform: translateX(${scrollLeft}px)`);
  }),

  areaWidth: computed('columnDates.length', function(){
    return (this.get('columnDates.length') + 2) * COL_WIDTH;
  }),

  areaHeight: computed('rentals.length', function(){
    return (this.get('rentals.length') + 3) * ROW_HEIGHT;
  }),

  calendarInnerStyle: computed('areaHeight', 'areaWidth', function(){
    return Ember.String.htmlSafe(`width:${this.get('areaWidth')}px;height:${this.get('areaHeight')}px;`);
  })
});
