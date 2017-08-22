import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/keycloak-plugin/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/keycloak-plugin', [])
.controller('keycloakPluginHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Keycloak Plugin';
  $scope.description = 'protect your kibana';

  const currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  const unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
