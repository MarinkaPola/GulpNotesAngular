angular.module('app', ['ui.router'])


    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])


.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state( {
            url: '/notes/{{note.uuid}}',
            templateUrl: './source/note.html',
            controller: 'noteCtrl'
        })
    }]);
