export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'kibana-keycloak-plugin',
    uiExports: {
      chromeNavControls: ['plugins/kibana-keycloak-plugin/logout/logout']
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) {
      require('./server/auth-local-cookie')(server, options);
    }
  });
};
