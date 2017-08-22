import { resolve } from 'path';
import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'keycloak-plugin',
    uiExports: {
      
      app: {
        title: 'Keycloak Plugin',
        description: 'protect your kibana',
        main: 'plugins/keycloak-plugin/app'
      },
      
      
      translations: [
        resolve(__dirname, './translations/es.json')
      ],
      
      
      hacks: [
        'plugins/keycloak-plugin/hack'
      ]
      
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    
    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }
    

  });
};
