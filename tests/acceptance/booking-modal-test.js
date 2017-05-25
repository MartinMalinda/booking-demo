import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';
import fillInBookingForm from '../helpers/fill-in-booking-form';


moduleForAcceptance('Acceptance | booking modal', {autoAuth: true});


test('visiting /', function(assert) {
  const rental = server.create('rental');
  server.createList('booking', 2, {rentalId: rental.attrs.id});
  
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.equal(find('.booking-item').length, 2);
    return click(find('.booking-item')[0]);
  });

  andThen(() => {
    assert.equal(find('.booking-detail').length, 1, 'booking detail modal dialog is present');
    click('.ember-modal-overlay');
  });

  andThen(() => {
    assert.equal(find('.booking-detail').length, 0, 'booking detail modal is hidden after clicking elsewhere');
    return click(find('.booking-item')[0]);
  });

  andThen(() => {
    assert.equal(find('.booking-detail').length, 1, 'booking detail modal dialog is present again');
    fillInBookingForm('2017-05-01', '2017-05-03', 0);
  });

  andThen(() => {
    assert.equal(find('.new-booking-form .error.message').length, 0, 'There is no error message after edit booking form submission');
    assert.ok(find('.booking-item').text().indexOf('malindacz@gmail.com') > -1, 'Client email has been updated');
    click('[data-delete-button]');
  });

  andThen(() => {
    assert.equal(find('.booking-item').length, 1, 'There is one less booking after clicking delete');

  });
});
