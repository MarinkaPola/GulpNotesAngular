const app = angular.module('app', []);

app.controller('appCtrl', function ($http, $scope) {

        $http.get('http://example-app/public/api')
            .then(function (result) {
                console.log('success', result);
                $scope.notes = result.data.data.collection;
            },
                function (result) {
                    console.log('error');
                })
    });


app.controller('appCtrl', function ($http, $scope) {

    $http.get('http://example-app/public/api/notes/:uuid')
        .then(function (result) {
                console.log('success', result);
                $scope.note = result.data.data;
            },
            function (result) {
                console.log('error');
            })
});
