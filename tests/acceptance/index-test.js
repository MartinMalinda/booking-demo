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

const fillInBookingForm = () => {
  run(() => {
    fillIn('.email', 'malindacz@gmail.com');
  });

  clickDatePicker('.startAt', '2017-05-01');
  clickDatePicker('.endAt', '2017-05-31');

  run(() => {
    selectChoose('.new-booking-form', '.ember-power-select-option', 0); // Select the 4th image
  });

  run(() => {
    click('.new-booking-form button');      
  });
}

test('visiting /index', function(assert) {
  
  defaultScenario(server);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    fillInBookingForm();
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
    fillInBookingForm();
  });

  andThen(() => {
    // pauseTest();
    assert.equal(find('.new-booking-form .error.message').length, 1, 'There is just one error message after second submission'); //bookings overlap
    

  });
});
