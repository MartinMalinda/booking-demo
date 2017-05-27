import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';
import fillInBookingForm from '../helpers/fill-in-booking-form';


moduleForAcceptance('Acceptance | booking modal', {autoAuth: true});


test('visiting /', async function(assert) {
  const rental = server.create('rental');
  server.createList('booking', 2, {rentalId: rental.attrs.id});
  
  await visit('/');

  assert.equal(currentURL(), '/');
  assert.equal(find('.booking-item').length, 2);
  await click(find('.booking-item')[0]);

  assert.equal(find('.booking-detail').length, 1, 'booking detail modal dialog is present');
  await click('.ember-modal-overlay');

  assert.equal(find('.booking-detail').length, 0, 'booking detail modal is hidden after clicking elsewhere');
  await click(find('.booking-item')[0]);

  assert.equal(find('.booking-detail').length, 1, 'booking detail modal dialog is present again');
  await fillInBookingForm('2017-05-01', '2017-05-03', 0);

  assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after edit booking form submission');
  assert.ok(find('.booking-item').text().indexOf('malindacz@gmail.com') > -1, 'Client email has been updated');
  await click('[data-delete-button]');

  assert.equal(find('.booking-item').length, 1, 'There is one less booking after clicking delete');

});
