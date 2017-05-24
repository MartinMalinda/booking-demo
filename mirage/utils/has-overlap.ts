import areRangesOverlapping from 'npm:date-fns/are_ranges_overlapping';



export default (rental, params, schema) => {

  const bookings = rental.bookings.models;

  const newStartAt = new Date(params.startAt);
  newStartAt.setHours(14);

  const newEndAt = new Date(params.endAt);
  newEndAt.setHours(10);

  return bookings.find(booking => {
    const startAt = new Date(booking.startAt);
    const endAt = new Date(booking.endAt);
    startAt.setHours(14);
    endAt.setHours(10);
    return areRangesOverlapping(newStartAt, newEndAt, startAt, endAt);
  });
};