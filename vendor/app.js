/**
 * Created by 77849 on 2015/9/23.
 */
var app = angular.module('app', ['ngRoute','user']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/index', {templateUrl: 'tpl/index.html'}).
        when('/list', {templateUrl: 'tpl/list.html', controller: ''}).
        when('/userList', {templateUrl: 'tpl/user/userList.html', controller: 'UserListController'}).
        when('/userAdd', {templateUrl: 'tpl/user/userAdd.html', controller: 'UserAddController'}).
        otherwise({redirectTo: '/index'});
}]);

