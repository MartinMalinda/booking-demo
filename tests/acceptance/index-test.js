import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import defaultScenario from 'booking-demo/mirage/scenarios/default';

const {run} = Ember;

moduleForAcceptance('Acceptance | index');

const clickDatePicker = (selector, value) => {
  run(() => {
    click(selector);
  });

  run(() => {
    click(`[data-date=${value}]`);
  });
};

const fillInBookingForm = (startAt, endAt, optionIndex) => {
  run(() => {
    fillIn('.email', 'malindacz@gmail.com');
  });

  clickDatePicker('.startAt', startAt);
  clickDatePicker('.endAt', endAt);

  run(() => {
    selectChoose('.new-booking-form', '.ember-power-select-option', optionIndex); // Select the 4th image
  });

  run(() => {
    click('.new-booking-form button');      
  });
}

test('fill in booking form, test overlap at /index', function(assert) {
  
  defaultScenario(server);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    fillInBookingForm('2017-05-01', '2017-05-31', 0);
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
    fillInBookingForm('2017-05-01', '2017-05-31', 0);
  });
});

test('one day overlap', function(assert) {
  
  defaultScenario(server);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    fillInBookingForm('2017-05-01', '2017-05-02', 0);
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
    fillInBookingForm('2017-05-01', '2017-05-02', 0);
  });
});
