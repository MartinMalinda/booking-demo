import Ember from 'ember';

const {computed, inject} = Ember;

export default Ember.Component.extend({

  dateHelp: inject.service(),

  newBookingnightsLength: computed('newBookingChangeset.startAt', 'newBookingChangeset.endAt', function(){
    return this.get('dateHelp').dateDiff(this.get('newBookingChangeset.startAt'), this.get('newBookingChangeset.endAt'));
  }),

  newBookingPrice: computed('newBookingnightsLength', 'newBookingChangeset.rental', function(){
    return this.get('newBookingnightsLength') * this.get('newBookingChangeset.rental.dailyRate');
  }),

  actions: {
    submit() {
      let changeset = this.get('newBookingChangeset');
      let snapshot = changeset.snapshot();
      changeset.validate().then(() => {
        if(changeset.get('isValid')){
          this.attrs.onSuccess(changeset, snapshot);
        }
      });
    }
  },
});
