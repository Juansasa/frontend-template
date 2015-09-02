(function() {
    'use strict';

    angular.module('forms')
        .run(register);

    /*@ngInject*/
    function register(formlyConfig) {
        formlyConfig.setType([]);
    }
})();