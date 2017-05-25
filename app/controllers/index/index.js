import Ember from 'ember';
import BookingValidations from '../../validations/booking';

export default Ember.Controller.extend({

  newBooking: Ember.Object.create({}),
  BookingValidations,

  actions: {
    saveBooking(changeset, snapshot) {
      // Changeset has applied changes to the newBooking object
      changeset.save().then(() => { 
        const bookingData = this.get('newBooking').getProperties('rental', 'clientEmail', 'startAt', 'endAt');
        const newBooking = this.store.createRecord('booking', bookingData);
        newBooking.save().then(() => {
          this.set('newBooking', Ember.Object.create({}));
          this.set('serverErrors', []);
        }, errorResponse => {
          changeset.restore(snapshot);
          changeset.pushErrors('endAt', errorResponse.errors.mapBy('description'));
          newBooking.rollbackAttributes();
        });
      });
    },
  }
});
