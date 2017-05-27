import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import defaultScenario from 'booking-demo/mirage/scenarios/default';
import fillInBookingForm from '../helpers/fill-in-booking-form';

const {run} = Ember;

const wait = time => {
  return new Ember.RSVP.Promise(resolve => {
    run.later(resolve, time);
  });
}

moduleForAcceptance('Acceptance | index', {autoAuth: true});

test('fill in booking form, test overlap at /index', async function(assert) {
  
  defaultScenario(server);

  await visit('/');

  assert.equal(currentURL(), '/');

  // run(() => {
    await fillInBookingForm('2017-05-01', '2017-05-03', 0);
  // });

  assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
  await fillInBookingForm('2017-05-01', '2017-05-03', 0);

  assert.equal(find('.new-booking-form .error.message').length, 1, 'There is error message after second submission');

  await fillInBookingForm('2017-05-04', '2017-05-05', 0);

  // run(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after first form submission');
    await fillInBookingForm('2017-05-04', '2017-05-05', 0);

    assert.equal(find('.new-booking-form .error.message').length, 1, 'There is error message after second form submission');
  // });

  await wait(50);
});


