
const app = angular.module('app', ['ui.router']);

app.component('register', {
    templateUrl: "../register.html",
    controller: "registerCtrl",
});

app.component('login', {
    templateUrl: "../login.html",
    controller: "loginCtrl",
});

app.component('logout', {
   // templateUrl: "../login.html",
    controller: "logoutCtrl",
});

app.component('header', {
    selector: "header", // <header></header>
    templateUrl: "../header.html",
   controller: "headerCtrl",
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

app.component('dashboard', {
    templateUrl: "../dashboard.html",
    controller: "dashboardCtrl",
});

app.component('notesSharedWu', {
    templateUrl: "../notesSharedWu.html",
    controller: "notesSharedWuCtrl",
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
            name: 'notesSharedWu',
            url: '/notes-shared-you',
            component: 'notesSharedWu',
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

        .state(  {
            name: 'logout',
            url: "/logout",
            component: 'logout',
        })

        .state( {
            name: 'dashboard',
            url: '/notes',
            component: 'dashboard',
        })
}]);



app.controller('appCtrl', function ($http, $scope) {

    $http.get('http://notes/public/api')
        .then(function (result) {
                console.log('success', result);
                $scope.notes = result.data.data;
            },
            function (result) {
                console.log('error');
            });

});


app.controller('noteCtrl', function ($http, $scope, $stateParams, $location) {

    $scope.noteUuid = $stateParams.noteUuid;

    console.log($scope.noteUuid);
    $http.get('http://notes/public/api/notes/'+$scope.noteUuid)
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
                app.myGlobalObject=$scope.note;
            },
            function (result) {
                console.log('error');
            });
    $scope.delete = function (note) {
        $http.delete('http://notes/public/api/notes/'+$scope.noteUuid, note)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes');
                },
                function (result) {
                    console.log('error', result);
                })
    };
    $scope.shared = function (note, email) {
        $http.post('http://notes/public/api/notes/'+$scope.noteUuid+'/share', note, email)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes');
                },
                function (result) {
                    console.log('error', result);
                })
    };

    $scope.detachFile = function (note, attachment) {
        $scope.attachment = attachment;
        $http.post('http://notes/public/api/notes/'+$scope.noteUuid+'/attachments/'+$scope.attachment.id, note, attachment)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes');
                },
                function (result) {
                    console.log('error', result);
                })
    };

    $scope.downloadFile = function (note, attachment) {
        $scope.attachment = attachment;
        $http.post('http://notes/public/api/notes/'+$scope.noteUuid+'/attachments/'+$scope.attachment.id+'/download', note, attachment)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes');
                },
                function (result) {
                    console.log('error', result);
                })
    }

});

app.controller('editCtrl', function ($http, $scope, $stateParams, $location) {

    $scope.note=app.myGlobalObject;
    console.log($scope.note);
    $scope.noteUuid = $stateParams.noteUuid;
    console.log($scope.noteUuid);
    $scope.update = function(note) {
        console.log(note);
        $http.put('http://notes/public/api/notes/'+$scope.noteUuid, note)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes/{noteUuid}');
                },
                function (result) {
                    console.log('error');
                })
    }
});

app.controller('createCtrl', function ($http, $scope, $location) {

    $scope.create = function(note) {
        console.log(note);
        $http.post('http://notes/public/api/notes', note)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes/{noteUuid}');
                },
                function (result) {
                    console.log('error');
                })
    }
});

app.controller('registerCtrl', function ($http, $scope, $location) {
    $scope.registering = function (user) {
        console.log(user);
        $http.post('http://notes/public/api/register', user)
            .then(function (result) {
                    console.log('success', result);
                    $location.url('/notes');
                },
                function (result) {
                    console.log('error' , result);
                })
    }

});
app.controller('loginCtrl', function ($http, $scope, $location) {
   $scope.logining = function (user) {
       console.log(user);
       $http.post('http://notes/public/api/login', user)
           .then(function (result) {
                   console.log(result.data.token);
               if (result.data.token) {
                   // store username and token in local storage to keep user logged in between page refreshes
                   window.localStorage.currentUser = user;
                  console.log(window.localStorage.currentUser);
                   // add jwt token to auth header for all requests
                   $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.token;
                   console.log('success', result);
                   $location.url('/notes');
               }
               },
               function (result) {
                   console.log('error', result);
               })
   }
});

app.controller('logoutCtrl', function ($http, $scope) {

        $http.post('http://notes/public/api/logout')
            .then(function (result) {
                    console.log('success', result);
                    delete window.localStorage.currentUser;
                    $http.defaults.headers.common.Authorization = '';
                    console.log(window.localStorage.currentUser);
                    $location.url("");
                },
                function (result) {
                    console.log('error');
                });
});

app.controller('dashboardCtrl', function ($http, $scope) {

    $http.get('http://notes/public/api/notes')
        .then(function (result) {
                console.log('success', result);
                $scope.notes = result.data.data;
            },
            function (result) {
                console.log('error');
            });

});

app.controller('notesSharedWuCtrl', function ($http, $scope) {

    $http.get('http://notes/public/api/notes-shared-you')
        .then(function (result) {
                console.log('success', result);
                $scope.notes = result.data.data;
            },
            function (result) {
                console.log('error');
            });

});

app.controller('headerCtrl', function ($scope) {

});
