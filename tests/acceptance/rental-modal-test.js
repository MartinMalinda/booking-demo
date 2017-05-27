import { test } from 'qunit';
import moduleForAcceptance from 'booking-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | rental modal', {autoAuth: true});

test('visiting /rental-modal', async function(assert) {

  const rental = server.create('rental');
  server.createList('booking', 2, {rentalId: rental.attrs.id});

  await visit('/');

  assert.equal(currentURL(), '/');
  assert.equal(find('a.rental:not(.new)').length, 1, 'There is currently one rental');
  await click(find('a.rental')[0]);


  assert.equal(currentURL(), `/rental/${rental.id}`, 'Redirected to subroute modal after clicking rental');
  await click('.ember-modal-overlay');


  assert.equal(currentURL(), '/');
  await click(find('a.rental')[0]);    


  fillIn('.rental-name', 'New name');
  fillIn('.rental-daily-rate', 500);
  await click('.rental-submit');


  assert.ok(find('a.rental').text().indexOf('New name') > -1, 'New name has propagated');
  await click(find('a.rental')[0]);    


  await click('.rental-delete');


  assert.equal(find('a.rental:not(.new)').length, 0, 'There are no rentals after previous deletion');
  await click('.rental.new');


  assert.equal(currentURL(), `/rental/new`, 'Redirected to subroute modal after clicking rental');
  fillIn('.rental-name', 'New name');
  fillIn('.rental-daily-rate', 500);
  await click('.rental-submit');


  assert.equal(find('a.rental:not(.new)').length, 1, 'There is one new rental');
  
});
