import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import defaultScenario from 'booking-demo/mirage/scenarios/default';

const {run, RSVP} = Ember;

// const wait = time => {
//   return new RSVP.Promise((resolve, reject) => {
//     setTimeout(resolve, time);
//   });
// };

moduleForAcceptance('Acceptance | index', {autoAuth: true});

const clickDatePicker = (selector, value) => {

  andThen(() => {
    return click(selector);
  });

  andThen(() => {
    return click(`[data-date=${value}]`);
  });
};

const fillInBookingForm = (startAt, endAt, optionIndex) => {
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
      click('.new-booking-form button');      
    });
  });

}

test('fill in booking form, test overlap at /index', function(assert) {
  
  defaultScenario(server);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    run(() => {
      fillInBookingForm('2017-05-01', '2017-05-03', 0);
    });
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
    fillInBookingForm('2017-05-01', '2017-05-03', 0);
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 1, 'There is error message after second submission');
  });

  andThen(() => {
    fillInBookingForm('2017-05-04', '2017-05-05', 0);
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
    fillInBookingForm('2017-05-04', '2017-05-05', 0);
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 1, 'There is error message after second form submission');
  });


});


