
angular.module('app', ['ui.router'])



.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('route1', {
             url: "/route1",
            templateUrl: "note.html",
            controller: "noteCtrl"
        })
    }]);
