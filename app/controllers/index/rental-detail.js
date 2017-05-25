import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    close() {
      this.transitionToRoute('index.index');
    },

    submit(changeset) {
      changeset.save().then(() => {
        this.transitionToRoute('index.index');
      });
    },

    deleteRental(rental) {
      rental.destroyRecord().then(() => {
        this.transitionToRoute('index.index');
      });
    }
  }
});
