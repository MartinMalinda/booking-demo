import areRangesOverlapping from 'npm:date-fns/are_ranges_overlapping';


// function isBetweenDates(date : Date, fromDate : Date, toDate : Date) : Boolean {
//   return date.getTime() >= fromDate.getTime() && date.getTime() <= toDate.getTime();
// }

// function hasDateRangeInBetween(from1 : Date, to1: Date, from2: Date, to2: Date) : Boolean {
//   return from1.getTime() <= from2.getTime() && to1.getTime() >= to2.getTime();
// }

// function dateRangesOverlap(from1 : Date, to1 : Date, from2 : Date, to2: Date) : Boolean {
//   return isBetweenDates(from1, from2, to2)
//     || isBetweenDates(to1, from2, to2)
//     || hasDateRangeInBetween(from1, to1, from2, to2);
// }

export default (rental, params, schema) => {

  const bookings = rental.bookings.models;

  const newStartAt = new Date(params.startAt);
  const newEndAt = new Date(params.endAt);

  return bookings.find(booking => {
    const {startAt, endAt} = booking;
    console.log(areRangesOverlapping(newStartAt, newEndAt, startAt, endAt));
    return areRangesOverlapping(newStartAt, newEndAt, startAt, endAt);
  });
};