import {
  validatePresence,
  validateLength,
  validateConfirmation,
  validateFormat
} from 'ember-changeset-validations/validators';

import { validate } from 'ember-validators';

import moment from 'moment';

const validateChronology = ({message}) => {
  return (key, newValue, oldValue, changes, content) => {
    let date = moment(newValue);
    return date.isAfter(changes.startAt) || message;
  };
};

export default {
  startAt: [
    validatePresence({presence: true, message: '{description} cannot be blank'}),
  ],
  endAt: [
    validatePresence({presence: true, message: '{description} cannot be blank'}),
    validateChronology({message: 'Dates must be chronological'})
  ],
  clientEmail: [
    validatePresence({presence: true, message: '{description} cannot be blank'})
  ],
  rental: [
    validatePresence({presence: true, message: '{description} cannot be blank'})
  ]
}