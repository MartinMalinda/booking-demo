import Ember from 'ember';

const {computed, inject} = Ember;

export default Ember.Component.extend({

  dateHelp: inject.service(),

  newBookingDaysLength: computed('newBookingChangeset.startAt', 'newBookingChangeset.endAt', function(){
    return this.get('dateHelp').dateDiff(this.get('newBookingChangeset.startAt'), this.get('newBookingChangeset.endAt'));
  }),

  newBookingPrice: computed('newBookingDaysLength', 'newBookingChangeset.rental', function(){
    return this.get('newBookingDaysLength') * this.get('newBookingChangeset.rental.dailyRate');
  }),

  actions: {
    submit() {
      let changeset = this.get('newBookingChangeset');
      changeset.validate().then(result => {
        if(changeset.get('isValid')){
          changeset.save().then(changeset => {
            this.attrs.onSuccess();
          });
        }
      });
    }
  },
});
