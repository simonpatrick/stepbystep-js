/**
 * Created by patrick on 15/8/22.
 */
Meteor.startup(function () {

    Messages.remove({});

    Factory.define('message', Messages, {
        text: function () {
            return Fake.sentence();
        }
    });

    if (Messages.find({}).count() === 0) {
        _(10).times(function (n) {
            Factory.create('message');
        });
    }
    //
    //Meteor.users.remove({})
    //Accounts.createUser({
    //    username:"simon",
    //    email:'password@password.com',
    //    password:'dumpassword'
    //});

});