import Ember from 'ember';
import config from 'booking-demo/config/environment';

const {inflector} = Ember.Inflector;

export default function() {

  this.namespace = config.rootURL === '/' ? '' : config.rootURL;   

  let endpoints = ['booking', 'rental'];

  endpoints.forEach(endpoint => {
    let plural = inflector.pluralize(endpoint);

    // findAll
    this.get(`/${plural}`, (schema, request) => {
      let params = Object.keys(request.queryParams);
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

    // delete
    this.delete(`/${plural}/:id`, (schema, {params: {id: id}}) => {
      return schema[plural].find(id).destroy();
    });
  });

}

