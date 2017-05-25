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

    let startAt, endAt;
    if(key === 'startAt') {
      startAt = moment(newValue);
      endAt = moment(changes.endAt || content.get('endAt'));
    } else {
      endAt = moment(newValue);
      startAt = moment(changes.startAt || content.get('startAt'));
    }

    return endAt.isAfter(startAt) || message;
  };
};

export default {
  startAt: [
    validatePresence({presence: true, message: '{description} cannot be blank'}),
    validateChronology({message: 'Dates must be chronological'})
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