const app = angular.module('app', ['ui.router']);

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

    $http.get('http://notesBack/public/api/notes/{{note.uuid}}')
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
            },
            function (result) {
                console.log('error');
            })
});
