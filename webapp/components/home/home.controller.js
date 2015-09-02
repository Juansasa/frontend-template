(function() {
    'use strict';
    angular.module('home')
        .controller('HomeController', homeCtrl);

    /*@ngInject*/
    function homeCtrl($scope, activeDirectory) {
        $scope.getPersons = getPersons;


        function getPersons(queryString) {
            return activeDirectory.getPersons(queryString).then(success, error);
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