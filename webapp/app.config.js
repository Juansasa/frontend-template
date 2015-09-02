(function() {
    'use strict';
    angular.module('previa.ad')
    .config(exposeRouteConfig);

    /*@ngInject*/
    function exposeRouteConfig($stateProvider) {
        angular.module('previa.ad').stateProvider = $stateProvider;
    }
})();