const Keycloak = require('./keycloak-hapi');

module.exports = function (server) {

  const yarOptions = {
  cookieOptions: {
    isSecure: false,
    password: 'the-password-must-be-at-least-32-characters-longasdfadf'
  }
};

  server.register([require('vision'), { register: require('yar'), options: yarOptions }, {register: Keycloak, options: {config: {store: 'yar'}}}], (err) => {

    if (err) {
      throw err;
    }

    console.log('test');
    server.auth.strategy('keycloak', 'keycloak');

    server.route([
      {
        method: ['GET', 'POST'],
        path: '/login',
        config: {
          auth: 'keycloak'
        },
        handler: (request, reply) => {
          console.log('ming')
          reply({ message: 'Welcome to keycloak' });
        }
      }
    ]);
  });
};
