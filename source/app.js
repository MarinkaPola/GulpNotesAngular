
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
          //  name: "route1",
          //  url: "/route1",
            name: 'note',
            url: '/notes/{noteUuid}',
            templateUrl: "../note.html",
            controller: "noteCtrl"
        })
}]);



app.controller('appCtrl', function ($http, $scope) {

    $http.get('http://notesBack/public/api')
        .then(function (result) {
                console.log('success', result);
                $scope.notes = result.data.data.collection;

                app.myGlobalObject=$scope.notes;

            },
            function (result) {
                console.log('error');
            });

});



app.controller('noteCtrl', function ($http, $scope, $stateParams) {
    console.log(app.myGlobalObject);
   $scope.noteUuid = $stateParams.noteUuid;
    console.log($scope.noteUuid);
    $http.get('http://notesBack/public/api/notes/'+$scope.noteUuid)
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
            },
            function (result) {
                console.log('error');
            })
});



