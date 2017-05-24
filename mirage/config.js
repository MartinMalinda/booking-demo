import Ember from 'ember';
import config from 'booking-demo/config/environment';
import hasOverlap from './utils/has-overlap';
import Response from 'ember-cli-mirage/response';

const {inflector} = Ember.Inflector;

export default function() {

  this.namespace = config.rootURL === '/' ? '' : config.rootURL;   

  const endpoints = ['booking', 'rental'];

  endpoints.forEach(endpoint => {
    const plural = inflector.pluralize(endpoint);

    // findAll
    this.get(`/${plural}`, (schema, request) => {

      const params = Object.keys(request.queryParams);
      if(params.length === 0){
        return schema[plural].all();
      }

      if(params[0] === 'ids'){
        // coalesce find requests
        return schema[plural].find(request.queryParams['ids']);
      }
      return schema[plural].where(request.queryParams);
    });

    // findOne
    this.get(`/${plural}/:id`, (schema, {params: {id: id}}) => {
      return schema[plural].find(id);
    });

    // save
    this.post(`/${plural}`, function(schema, request) {
      const params = this.normalizedRequestAttrs();
      const rentalId = params.rentalId;
      const rental = schema.find('rental', rentalId);
      if(!hasOverlap(rental, params, schema)){
        return schema.create(endpoint, params).save();
      } else {
        return new Response(422, { 'Content-Type': 'application/json' }, {
          errors: [{
            'status': 422,
            'title': 'Invalid date',
            'description': 'Date range overlaps with other existing booking'
          }]
        });
      }
    });

    // delete
    this.delete(`/${plural}/:id`, (schema, {params: {id: id}}) => {
      return schema[plural].find(id).destroy();
    });
  });

}

