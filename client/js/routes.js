var app = angular.module('time_tracker', ['ui.router', 'satellizer']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$authProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl:'/assets/views/login.html',
        controller: 'LoginController'
      })
      .state('auth_success', {
        url: '/auth/success',
        controller: 'AuthSuccessController'
      })
      .state('auth_failed', {
        url: '/auth/failed',
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $authProvider.facebook({
      clientId: '336550850115669',
      redirectUri: window.location.origin + '/auth/facebook/callback',
    });
  }
]);
