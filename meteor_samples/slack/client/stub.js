/**
 * Created by patrick on 15/8/22.
 */

Meteor.methods({
   newMessage: function(message){
       message.timestamp=Date.now;
       message.user=Meteor.userId();
       Messages.insert(message);
   }
});
