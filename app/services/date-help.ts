import Ember from 'ember';
import moment from 'moment';
import {Moment} from '../../types/moment-types';

interface MomentRange extends Object {
  start : MomentExt,
  end : MomentExt,
  overlaps : Function,
  intersect: Function,

};

interface MomentExt extends Moment {
  range() : MomentRange
}

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

  },

  overlaps(range1 : MomentRange, range2 : MomentRange) : Boolean {
    var overlap = range1.overlaps(range2);
    if(!overlap){
      return (this.rangesCollideOnFirstDay(range1, range2) || this.rangesCollideOnLastDay(range1, range2));
    } else {
      return overlap;
    }

  },

  rangesCollideOnFirstDay(range1 : MomentRange, range2 : MomentRange) : Boolean {
    return (range1.start.isSame(range2.end));
  },

  rangesCollideOnLastDay(range1 : MomentRange, range2 : MomentRange) : Boolean {
    return (range1.end.isSame(range2.end));
  },

  intersect(range1 : MomentRange, range2 : MomentRange) : MomentRange {

    var intersect = range1.intersect(range2);

    if(!intersect){

      if(this.rangesCollideOnFirstDay){
        return moment.range(range1.start, range1.start);
      }
      if(this.rangesCollideOnLastDay){
        return moment.range(range1.end, range1.end);
      }

      return null;
      
    } else {
      return intersect;
    }
  }
});
