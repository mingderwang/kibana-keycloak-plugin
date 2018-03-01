const authKeycloak = require('hapi-auth-keycloak');

module.exports = function (server) {

  const yarOptions = {
  cookieOptions: {
    isSecure: false,
    password: 'the-password-must-be-at-least-32-characters-longasdfadf'
  }
  };

const keycloakOptions = {
  realmUrl: 'https://localhost:8080/auth/realms/testme',
  clientId: 'foobar',
  minTimeBetweenJwksRequests: 15,
  cache: false,
  userInfo: ['name', 'email']
}

  server.register([require('vision'), { register: require('yar'), options: yarOptions },
  {register: authKeycloak, options:keycloakOptions}], (err) => {

    if (err) {
      throw err;
    }

    console.log('test');
    server.auth.strategy('keycloak-jwt', 'keycloak-jwt');

    server.route([
      {
        method: ['GET'],
        path: '/login',
        config: {
          description: 'protected endpoint',
          auth: {
            strategies: ['keycloak-jwt'],
            access: {
              scope: ['realm:admin', 'editor', 'other-resource:creator', 'scope:foo.READ']
            }
          }
        },
        handler: (request, reply) => {
            console.log('ming')
            reply({ message: 'Welcome to keycloak' });
        }
      }
    ]);
  });
};
