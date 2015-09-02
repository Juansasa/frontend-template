(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, adService) {
        $scope.getPersons = getPersons;


        function getPersons(queryString) {
            return adService.getPersons(queryString).then(success, error);
        }

        function success(response) {
            return response.data.map(function(item) {
                return item;
            });
        }

        function error(err) {
            return err.message;
        }
    }
})();