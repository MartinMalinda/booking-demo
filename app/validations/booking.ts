import {
  validatePresence,
  validateLength,
  validateConfirmation,
  validateFormat
} from 'ember-changeset-validations/validators';

import { validate } from 'ember-validators';

import moment from 'moment';

const validateChronology = () => {
  return (key, newValue, oldValue, changes, content) => {
    let date = moment(newValue);
    return date.isSame(changes.startAt) || date.isAfter(changes.startAt);
  };
};

export default {
  startAt: [
    validatePresence(true),
  ],
  endAt: [
    validatePresence(true),
    validateChronology()
  ],
  clientEmail: [
    validatePresence(true)
  ],
  rental: [
    validatePresence(true)
  ]
}