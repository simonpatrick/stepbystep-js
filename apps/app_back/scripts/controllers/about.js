'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the resumeApp
 */
angular.module('resumeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
