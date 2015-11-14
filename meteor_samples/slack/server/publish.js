/**
 * Created by patrick on 15/8/22.
 */
Meteor.publish('messages',function(){
    return Messages.find();
});

Meteor.publish("allUserNames",function(){
   return Meteor.users.find({},{
       fields:{
           "username":1,
           "services.github.username":1
       }
   });
});