(function() {
    'use strict';

    var sharedModule = angular.module('shared');
    sharedModule.config(configure);

    /*@ngInject*/
    function configure($logProvider, customExceptionHandlerProvider, routehelperConfigProvider,
        gettext, $urlRouterProvider, $stateProvider) {
        sharedModule.value('config', config);
        var config = {
            appErrorPrefix: '[Previa Error]: ',
            appTitle: gettext('Previa AD-gränsnitt'),
            version: gettext('previa-version/0.0.0')
        };

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.docTitle = gettext('Previa');

        // Configure the common exception handler
        customExceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();