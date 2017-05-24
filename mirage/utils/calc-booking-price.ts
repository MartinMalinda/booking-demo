import differenceInDays from 'npm:date-fns/difference_in_days';

export default (booking, rental) => {
  return differenceInDays(booking.endAt, booking.startAt) * rental.dailyRate;
};