
const app = angular.module('app', ['ui.router']);

app.component('noteShow', {
    //selector: "noteShow", // <note-show></note-show>
    templateUrl: "../note.html",
    controller: "noteCtrl",
});

app.component('notesShow', {
    templateUrl: "../home.html",
    controller: "appCtrl",
});

app.component('noteEdit', {
    templateUrl: "../edit_note.html",
    controller: "editCtrl",
});

app.component('noteCreate', {
    templateUrl: "../create_note.html",
    controller: "createCtrl",
});

app.config(['$stateProvider', function ($stateProvider) {


    $stateProvider
        .state( {
            name: 'note',
            url: '/notes/{noteUuid}',
            component: 'noteShow',
        })
        .state('default',{
          //  name: "#",
            url: "",
            component: "notesShow"
        })
        .state( {
            name: 'noteEdit',
            url: '/notes/{noteUuid}/edit',
            component: 'noteEdit',
        })
        .state( {
            name: 'noteCreate',
            url: '/notes/create',
            component: 'noteCreate',
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

app.controller('editCtrl', function ($http, $scope, $stateParams) {
    $scope.noteUuid = $stateParams.noteUuid;
    console.log($scope.noteUuid);
    $http.put('http://notesBack/public/api/notes/'+$scope.noteUuid,)
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
            },
            function (result) {
                console.log('error');
            })
});

app.controller('createCtrl', function ($http, $scope, $stateParams) {


    $http.post('http://notesBack/public/api/notes', )
        .then(function (result) {
                console.log('success', result);

            },
            function (result) {
                console.log('error');
            })
});
