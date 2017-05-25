import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | rental modal', {autoAuth: true});

test('visiting /rental-modal', function(assert) {

  const rental = server.create('rental');
  let bookings = server.createList('booking', 2, {rentalId: rental.attrs.id});

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('a.rental:not(.new)').length, 1, 'There is currently one rental');
    click(find('a.rental')[0]);
  });

  andThen(() => {
    assert.equal(currentURL(), `/rental/${rental.id}`, 'Redirected to subroute modal after clicking rental');
    click('.ember-modal-overlay');
  });

  andThen(() => {
    assert.equal(currentURL(), '/');
    click(find('a.rental')[0]);    
  });

  andThen(() => {
    fillIn('.rental-name', 'New name');
    fillIn('.rental-daily-rate', 500);
    click('.rental-submit');
  });

  andThen(() => {
    assert.ok(find('a.rental').text().indexOf('New name') > -1, 'New name has propagated');
    click(find('a.rental')[0]);    
  });

  andThen(() => {
    click('.rental-delete');
  });

  andThen(() => {
    assert.equal(find('a.rental:not(.new)').length, 0, 'There are no rentals after previous deletion');
    click('.rental.new');
  });

  andThen(() => {
    assert.equal(currentURL(), `/rental/new`, 'Redirected to subroute modal after clicking rental');
    fillIn('.rental-name', 'New name');
    fillIn('.rental-daily-rate', 500);
    click('.rental-submit');
  });

  andThen(() => {
    assert.equal(find('a.rental:not(.new)').length, 1, 'There is one new rental');
  });
});
