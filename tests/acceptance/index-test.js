import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import defaultScenario from 'booking-demo/mirage/scenarios/default';
import fillInBookingForm from '../helpers/fill-in-booking-form';

const {run, RSVP} = Ember;

// const wait = time => {
//   return new RSVP.Promise((resolve, reject) => {
//     setTimeout(resolve, time);
//   });
// };

moduleForAcceptance('Acceptance | index', {autoAuth: true});

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


