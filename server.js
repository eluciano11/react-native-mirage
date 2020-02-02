import {Server, Model} from 'miragejs';

export function makeServer({
  environment = 'development',
  trackRequests = false,
} = {}) {
  let server = new Server({
    urlPrefix: 'http://localhost:3000',
    namespace: '/v1/api',

    environment,
    trackRequests,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', {name: 'Bob'});
      server.create('user', {name: 'Alice'});
    },

    routes() {
      this.get('/users', schema => {
        return schema.users.all();
      });
    },
  });

  return server;
}
