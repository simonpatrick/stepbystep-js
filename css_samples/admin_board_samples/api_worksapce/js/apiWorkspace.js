/**
 * Created by patrick on 16/2/5.
 */

var apiWorkspace = angular.module('apiWorkspace', ['ng-admin']);
apiWorkspace.config(['NgAdminConfigurationProvider'],
    function (NgAdminConfigurationProvider) {
        var nga = NgAdminConfigurationProvider;
        var admin = nga.application('apiWorkspace');
        //place menu page configuration here
        nga.configure(admin);
    });