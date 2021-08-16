
const app = angular.module('app', ['ui.router']);

/*app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state( {
            url: "",
            templateUrl: "../home.html",
            controller: "appCtrl"
        })
}]);*/

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state( {
            name: "route1",
            url: "/route1",
            templateUrl: "../note.html",
            controller: "noteCtrl"
        })
}]);

app.controller('appCtrl', function ($http, $scope) {

    $http.get('http://notesBack/public/api')
        .then(function (result) {
                console.log('success', result);
                $scope.notes = result.data.data.collection;
            },
            function (result) {
                console.log('error');
            })
});



app.controller('noteCtrl', function ($http, $scope) {

    $http.get('http://notesBack/public/api/notes/'.notes)
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
            },
            function (result) {
                console.log('error');
            })
});



