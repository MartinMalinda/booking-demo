import Ember from 'ember';

export function indexOf([collection, item]) {
  return collection.indexOf(item);
}

export default Ember.Helper.helper(indexOf);
