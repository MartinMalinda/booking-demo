import Ember from 'ember';

const {run, $} = Ember;

export const clickDatePicker = async function(selector, value) {
  await click(selector);
  await click(`[data-date=${value}]`);
};

export default async function(startAt, endAt, optionIndex) {
  await fillIn('.email', 'malindacz@gmail.com');

  await clickDatePicker('.startAt', startAt);
  await clickDatePicker('.endAt', endAt);

  // await selectChoose('.new-booking-form', '.ember-power-select-option', optionIndex); // Select the 4th image

  run(() => {
    const $options = $('.x-select option');
    $($options[optionIndex]).prop('selected', true).trigger('change');
  });

  await click('.new-booking-form [data-save-button]');      
}
