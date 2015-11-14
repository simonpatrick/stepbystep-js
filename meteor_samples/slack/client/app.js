/**
 * Created by patrick on 15/8/22.
 */
Template.messages.helpers({
   messages: Messages.find({})
    //messages: [
    //    { text: "All these messages" },
    //    { text: "Uses the same template" },
    //    { text: "But have a different data context" },
    //    { text: "It's why these messages are all different!" },
    //    { text: "Hey!" },
    //    { text: "What's up man!" },
    //    { text: "Hello" }
    //]
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper("timestampToTime",function(timestamp){
    var date=new Date(timestamp);
    var hours = date.getHours();
    var minutes="0"+date.getMinutes();
    var seconds="0"+date.getSeconds();
    return hours+":"+minutes.substr(minutes.length-2)+":";
});

Template.registerHelper("usernameFromId",function(userId){
    var user=Meteor.users.findOne({_id:userId});
    if(typeof user==="undefined"){
        return "Anonymous";
    }

    if (typeof user.services.github!=="undefined"){
        return user.services.github.username;
    }

    return user.username;
});

Meteor.subscribe('message');
Meteor.subscribe('allUsernames');