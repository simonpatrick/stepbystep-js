Tasks = new Mongo.Collection('tasks');


if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

    angular.module('todos', ['angular-meteor']);
    function onReady() {
        angular.bootstrap(document, ['todos']);
    }

    if (Meteor.isCordova) {
        angular.element(document).on('deviceready', onReady());
    } else {
        angular.element(document).ready(onReady);
    }
    angular.module('todos').controller('ToDosListCtrl',
        ['$scope', '$meteor', function ($scope, $meteor) {
            //$scope.tasks=[
            //  { text: 'This is task 1' },
            //  { text: 'This is task 2' },
            //  { text: 'This is task 3' }
            //]
            //Tasks.find({ checked: {$ne: true} }, { sort: { createdAt: -1 } })
            $scope.tasks = $meteor.collection(function () {
                return Tasks.find($scope.getReactively('query'),
                    {sort: {createdAt: -1}});
            });
            $scope.deleteTask = function (task) {
                $meteor.call('deleteTask', task._id);
            };
            $scope.setChecked = function (task) {
                $meteor.call('setChecked', task._id, !task.checked);
            };

            $scope.addTask = function (newTask) {
                $meteor.call('addTask',newTask);
            };

            $scope.$watch('hideCompleted',function(){
               if($scope.hideCompleted){
                   $scope.query={checked:{$ne:true}}
               }else{
                   $scope.query={};
               }
            });

            $scope.incompleteCount =function(){
                return Tasks.find({ checked: {$ne: true} }).count();
            };

            $scope.setPrivate = function(task){
                $meteor.call('setPrivate', task._id, ! task.private);
            },

            $scope.$watch('hideCompleted',function(){
              if($scope.hideCompleted){
                  $
              }
            })
        }]);
}

Meteor.methods({
   addTask: function(text){
       if(!Meteor.userId()){
           throw new Meteor.Error('not authorized');
       }

       Tasks.insert({
           text: text,
           createdAt: new Date(),
           owner: Meteor.userId(),
           username: Meteor.user().username
       });
   },
   deleteTask: function(taskId){
       Tasks.remove(taskId);
   },
   setChecked: function(taskId,setChecked){
       Tasks.update(taskid,{$set:{checked: setChecked}});
   },

   setPrivate: function(taskId,setChecked){
       var task = Tasks.findOne(taskId);
       if(task.owner !==Meteor.userId){
           throw new Meteor.Error('not-authorized');
       }

       Tasks.update(taskId,{$set:{private: setToPrivate}});
   }

});

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.publish('tasks', function () {
            return Tasks.find({
                $or: [
                    { private: {$ne: true} },
                    { owner: this.userId }
                ]
            });
        });
    });
}


