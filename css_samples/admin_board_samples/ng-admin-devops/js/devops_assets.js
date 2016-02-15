/**
 * Created by patrick on 16/2/15.
 */

var devOpsAssets = angular.module('devOpsAssets', ['ng-admin']);

devOpsAssets.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('Dev Ops Assets System')
        .baseApiUrl('http://127.0.0.1:8080/');
    var siteNode = nga.entity('siteNodes');
    var site = nga.entity('sites');
    var server = nga.entity('servers');

    var serverAdditionalAttribute = nga.entity('serverAdditionalAttributes');
    var sites = function (nga, admin) {
        site.listView().fields([
            nga.field('id'),
            nga.field('siteName').label("site_name"),
            nga.field('siteDomainName'),
            nga.field('siteComments'),
            nga.field('serverIp'),
            nga.field('status')
        ]);
        site.creationView().fields([
            nga.field('siteName').label("site_name"),
            nga.field('siteDomainName'),
            nga.field('siteComments'),
            nga.field('siteIp'),
            nga.field('status')
        ]);

        site.editionView().fields(
            site.listView().fields(),
            nga.field('siteNodes', 'embedded_list')
                .targetFields([
                    nga.field('siteNodeComments'),
                    nga.field('siteNodeIP'),
                    nga.field('jmxPort'),
                    nga.field('status')
                ])
        );
        site.showView().fields(site.editionView().fields());
        admin.addEntity(site);
    };


    var siteNodes = function (nga, admin) {
        siteNode.listView().fields([
            nga.field('id'),
            nga.field('siteId', 'reference')
                .targetEntity(site).targetField(nga.field('siteName'))
                .label('site_name'),
            nga.field('siteNodeComments'),
            nga.field('siteNodeIp'),
            nga.field('jmxPort'),
            nga.field('status')
        ]);
        siteNode.creationView().fields([
            nga.field('siteId'),
            nga.field('siteNodeComments'),
            nga.field('siteNodeIP'),
            nga.field('jmxPort'),
            nga.field('status')
        ]);
        siteNode.editionView().fields(siteNode.creationView().fields());
        siteNode.showView().fields(siteNode.creationView().fields());
        admin.addEntity(siteNode);
    };


    var serverAdditionalAttributes = function (nga, admin) {
        serverAdditionalAttribute.listView().fields([
            nga.field('id'),
            nga.field('serverAdditionalAttributeName').label("属性"),
            nga.field('serverType'),
            nga.field('status')
        ]);
        serverAdditionalAttribute.creationView().fields([
            nga.field('serverAdditionalAttributeName').label("属性"),
            nga.field('serverType'),
            nga.field('status')
        ]);
        serverAdditionalAttribute.editionView().fields(serverAdditionalAttribute.creationView().fields());
        serverAdditionalAttribute.showView().fields(serverAdditionalAttribute.listView().fields());
        admin.addEntity(serverAdditionalAttribute);
    };

    var server = nga.entity('servers');
    var servers = function (nga, admin) {
        var server = nga.entity('servers');
        server.listView().fields([
            nga.field('id'), nga.field('serverName'), nga.field('serverIP'), nga.field('serverType'), nga.field('serverOS'), nga.field('serverMem'), nga.field('serverCPU'), nga.field('serverHD1'), nga.field('serverHD2'), nga.field('serverRaidLV'), nga.field('serverManagementCardIP'), nga.field('serverManagementCardUser'), nga.field('serverManagementCardPWD'), nga.field('serverManagementCardSN'), nga.field('serverAssetNo'), nga.field('account'), nga.field('accountPassword'), nga.field('serverUsageComments'), nga.field('status'), nga.field('serverAddlValues'),
        ]);
        server.creationView().fields([
            nga.field('id'), nga.field('serverName'), nga.field('serverIP'), nga.field('serverType'), nga.field('serverOS'), nga.field('serverMem'), nga.field('serverCPU'), nga.field('serverHD1'), nga.field('serverHD2'), nga.field('serverRaidLV'), nga.field('serverManagementCardIP'), nga.field('serverManagementCardUser'), nga.field('serverManagementCardPWD'), nga.field('serverManagementCardSN'), nga.field('serverAssetNo'), nga.field('account'), nga.field('accountPassword'), nga.field('serverUsageComments'), nga.field('status'), nga.field('serverAddlValues'),
        ]);
        server.editionView().fields(server.creationView().fields());
        server.showView().fields(server.listView().fields());
        admin.addEntity(server);
    };

    servers(nga, admin);
    sites(nga, admin);
    siteNodes(nga, admin);
    serverAdditionalAttributes(nga, admin);
    nga.configure(admin);
}]);