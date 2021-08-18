
const app = angular.module('app', ['ui.router']);

app.component('noteShow', {
    //selector: "noteShow", // <note-show></note-show>
    templateUrl: "../note.html",
    controller: "noteCtrl",
});

app.component('notesShow', {
    selector: "notesShow", // <notes-show></notes-show>
    templateUrl: "../home.html",
    controller: "appCtrl",
});

app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state( {
            name: 'note',
            url: '/notes/{noteUuid}',
            component: 'noteShow',
        })
        .state( {
            name: "#",
            url: "/",
            component: "notesShow"
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




