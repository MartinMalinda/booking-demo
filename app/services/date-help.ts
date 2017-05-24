import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({

  getDaysInMonth(month : number, year : number) : number {
    return new Date(year, month, 0).getDate();
  },

  dateDiff(date1 : Date, date2 : Date, strict : Boolean) : number {

    if(!date1 || !date2){
      return -1;
    }

    var mdate1 = moment(date2);
    var mdate2 = moment(date1);

    if(mdate1.isSame(mdate2)) {
      return 1;
    }

    return mdate1.diff(mdate2, 'days') + (strict ? 1 : 0);

  },

  getArrayOfDates(startDate : Date, endDate : Date) : Array<Date> {
    var dates = [];
    var start = moment(startDate);
    var end = moment(endDate);

    while(start.unix() <= end.unix()){
      dates.push(start.format());
      start.add(1, 'day');
    }

    dates.pop();

    return dates;

  }


});
