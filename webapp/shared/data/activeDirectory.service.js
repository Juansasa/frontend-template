(function() {
    'use strict';
    angular.module('data')
        .factory('activeDirectory', adService);

    /*@ngInject*/
    function adService($http) {
        var service = {
            getPersons: getPersons
        };

        return service;

        function getPersons(queryString) {
            return $http.get('api/ad/search/' + queryString);
        }
    }

})();