import Ember from 'ember';
import BookingValidations from '../../validations/booking';

const {computed} = Ember;

export default Ember.Controller.extend({

  BookingValidations,

  rentals: computed('model', function(){
    return this.store.peekAll('rental');
  }),

  actions: {
    saveBooking(changeset, snapshot) {
      changeset.save().then(() => {
      }, errorResponse => {
        changeset.restore(snapshot);
        changeset.pushErrors('endAt', errorResponse.errors.mapBy('description'));
      });
    },

    deleteBooking() {
      // if(confirm('Really delete this?')) {
        this.get('model').destroyRecord()
      // }
    },

    close() {
      this.transitionToRoute('index.index');
    }
  }
});
