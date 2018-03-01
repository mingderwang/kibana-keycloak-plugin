import { chromeNavControlsRegistry } from 'ui/registry/chrome_nav_controls';

chromeNavControlsRegistry.register(function () {
  return {
    name: 'logout',
    order: 1000,
    template: require('plugins/kibana-keycloak-plugin/logout/logout.html')
  };
});
