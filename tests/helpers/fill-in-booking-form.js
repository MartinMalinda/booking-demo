import Ember from 'ember';


const {run} = Ember;

export const clickDatePicker = (selector, value) => {

  andThen(() => {
    return click(selector);
  });

  andThen(() => {
    return click(`[data-date=${value}]`);
  });
};

export default (startAt, endAt, optionIndex) => {
  run(() => {
    fillIn('.email', 'malindacz@gmail.com');
  });

  clickDatePicker('.startAt', startAt);
  clickDatePicker('.endAt', endAt);

  andThen(() => {
    run(() => {
      selectChoose('.new-booking-form', '.ember-power-select-option', optionIndex); // Select the 4th image
    });

    run(() => {
      click('.new-booking-form [data-save-button]');      
    });
  });
}
