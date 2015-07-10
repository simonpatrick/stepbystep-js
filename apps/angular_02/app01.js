/**
 * Created by patrick on 15/7/10.
 */

var helloApp  = angular.module('hello',[])
helloApp.controller('helloCtrl',function($scope){
    $scope.name="world";
  });
