'use strict';

var app = angular.module('BargainAdmin', ['ngRoute', 'ui.bootstrap',  'ngAnimate', 'toaster','ngFileUpload']);


app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'ApplicationController'
        })
        .when('/', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'ApplicationController',
            role: '0'
        }).when('/productdetails', {
                templateUrl: 'partials/productdetails.html',
                controller: 'ApplicationController'
        }).when('/subproductdetails', {
                templateUrl: 'partials/subproductdetails.html',
                controller: 'ApplicationController'
        }).when('/settings', {
                templateUrl: 'partials/settings.html',
                controller: 'ApplicationController'
        }).when('/userdetails', {
                templateUrl: 'partials/userdetails.html',
                controller: 'ApplicationController'
        }).when('/usercategory', {
                templateUrl: 'partials/usercategory.html',
                controller: 'ApplicationController'
        }).when('/professionaldetails', {
                templateUrl: 'partials/professionaldetails.html',
                controller: 'ApplicationController'
        }).when('/authenticatepostdetails', {
                templateUrl: 'partials/authenticatepostdetails.html',
                controller: 'ApplicationController'
        }).when('/allApprovedPostDetails', {
                templateUrl: 'partials/allApprovedPostDetails.html',
                controller: 'ApplicationController'
        }).when('/allDeletedPostDetails', {
                templateUrl: 'partials/allDeletedPostDetails.html',
                controller: 'ApplicationController'
        }).when('/marketingPostDetails', {
                templateUrl: 'partials/marketingpostdetails.html',
                controller: 'ApplicationController'
        }).when('/statencitywisedetails', {
                templateUrl: 'partials/statencitywisedetails.html',
                controller: 'ApplicationController'
        }).when('/statewisedetails', {
                templateUrl: 'partials/statewisedetails.html',
                controller: 'ApplicationController'
        }).when('/sendnotificationtoall', {
                templateUrl: 'partials/sendNotificationtoall.html',
                controller: 'ApplicationController'
        }).when('/sendnotificationtousers', {
                templateUrl: 'partials/sendnotificationtousers.html',
                controller: 'ApplicationController'
        }).otherwise({
            redirectTo: '/login'
        });
  }]);