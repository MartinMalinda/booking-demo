import {token} from '../config';
import Response from 'ember-cli-mirage/response';


export default cb => {
  return function(schema, request) {
    if(request.requestHeaders.token === token){
      return cb(schema, request);
    } else {
      return new Response(401, { 'Content-Type': 'application/json' }, {
        errors: [{
          'status': 401,
          'title': 'Anauthenticated',
          'description': 'You cannot access this data. Login first.'
        }]
      });
    }
  }
};