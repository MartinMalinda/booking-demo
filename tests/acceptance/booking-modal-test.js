import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | booking modal', {autoAuth: true});


test('visiting /', function(assert) {
  const rental = server.create('rental');
  let bookings = server.createList('booking', 2, {rentalId: rental.attrs.id});
  
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
    return click(find('.booking-item')[0]);
  });

  andThen(() => {
    assert.equal(find('.booking-detail').length, 1, 'booking detail modal dialog is present');
  });
});
