import Ember from 'ember';

const {computed, $} = Ember;

export default Ember.Component.extend({

  classNames: ['calendar-area'],

  rentalsColumnStyle: computed('scrollLeft', function(){
    let scrollLeft = this.get('scrollLeft');
    return Ember.String.htmlSafe(`transform: translateX(${scrollLeft}px)`);
  }),
});
