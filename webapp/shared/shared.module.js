(function() {
    'use strict';
    /**
     * Shared Module
     *
     * This module include all common utilities modules used accross the app.
     */
    angular.module('shared', [
        'gettext',
        //'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngResource',
        'ui.bootstrap',
        'angularSpinner',
        'formly',
        'formlyBootstrap',

        'exception',
        'router',
        'forms',
        'data'
    ]).run(initStart);

    /*@ngInject*/
    function initStart($rootScope, gettextCatalog) {
        gettextCatalog.currentLanguage = 'sv';
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
})();