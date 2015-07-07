/**
 * Created by patrick on 15/7/1.
 */
var scotchApp = angular.module('scotchApp',['ngRoute']);

//configuration
scotchApp.config(function($routProvier){
  $routProvier
    .when('/',{
      templateUrl:'views/home.html',
      controller: 'mainController'
    })
    .when('/about',{
      templateUrl:'views/about.html',
      controller: 'aboutController'
    })
    .when('/contact',{
      templateUrl:'views/contact.html',
      controller: 'contactController'
    });
});

scotchApp.controller('mainController',function($scope){
  $scope.message='Everyone come and see how good I look!';
});

scotchApp.controller('aboutController',function($scope){
  $scope.message='Look! I am an about page'
});

scotchApp.controller('contactController',function($scope){
  $scope.message='Contact Us!JK,this is just a demo'
});

