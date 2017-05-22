export default function( server ) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);

  let rentals = server.createList('rental', 10);

  rentals.forEach(rental => {
    // create bookings
    let bookings = server.createList('booking', 10, {rentalId: rental.attrs.id});
    rentals.bookings = bookings;
  });
}
