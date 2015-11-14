/**
 * Created by patrick on 15/8/22.
 */
Meteor.startup(function () {
    smtp = {
        username: 'simonpatrick@163.com',
        password: 'y3Z8TQxpxCiYsJJsCwyV0A',
        server:   'smtp.notexisting.com',
        port: 587
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});