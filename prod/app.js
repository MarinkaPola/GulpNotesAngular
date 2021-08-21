
const app = angular.module('app', ['ui.router']);

app.component('register', {
    templateUrl: "../register.html",
    controller: "registerCtrl",
});

app.component('login', {
    templateUrl: "../login.html",
    controller: "loginCtrl",
});

app.component('header', {
    selector: "header", // <header></header>
    templateUrl: "../header.html",
   // controller: "headerCtrl",
});

app.component('noteShow', {
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
            component: 'notesShow',
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

        .state( {
            name: 'register',
            url: '/register',
            component: 'register',
        })
        .state( {
            name: 'login',
            url: '/login',
            component: 'login',
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
            });

});


app.controller('noteCtrl', function ($http, $scope, $stateParams) {

    $scope.noteUuid = $stateParams.noteUuid;
    console.log($scope.noteUuid);
    $http.get('http://notesBack/public/api/notes/'+$scope.noteUuid)
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
                app.myGlobalObject=$scope.note;
            },
            function (result) {
                console.log('error');
            })
});

app.controller('editCtrl', function ($http, $scope, $stateParams) {

    $scope.note=app.myGlobalObject;
    console.log($scope.note);
    $scope.noteUuid = $stateParams.noteUuid;
    console.log($scope.noteUuid);
    $scope.update = function(note) {
        console.log(note);
        $http.put('http://notesBack/public/api/notes/'+$scope.noteUuid, note)
            .then(function (result) {
                    console.log('success', result);
                },
                function (result) {
                    console.log('error');
                })
    }
});

app.controller('createCtrl', function ($http, $scope, $stateParams) {


    $scope.create = function(note) {
        console.log(note);
        $http.post('http://notesBack/public/api/notes', note)
            .then(function (result) {
                    console.log('success', result);
                },
                function (result) {
                    console.log('error');
                })
    }
});

app.controller('registerCtrl', function ($http, $scope) {
    $scope.registering = function (user) {
        console.log(user);
        $http.post('http://notesBack/public/api/register', user)
            .then(function (result) {
                    console.log('success', result);
                },
                function (result) {
                    console.log('error');
                })
    }

});
app.controller('loginCtrl', function ($http, $scope) {
   $scope.logining = function (user) {
       console.log(user);
       $http.post('http://notesBack/public/api/login', user)
           .then(function (result) {
                   console.log('success', result);
               },
               function (result) {
                   console.log('error');
               })
   }
});
