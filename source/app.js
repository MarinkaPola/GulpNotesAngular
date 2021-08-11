angular.module('app',['ngRoute'])


.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] ='*';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.html'
        })
        .when('/notes/{{note.uuid}}',{
            templateUrl: 'note.html'
        })
});
