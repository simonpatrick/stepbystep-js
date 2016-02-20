/**
 * Created by patrick on 16/2/15.
 */
'use strict'

var devOpsAssets = angular.module('devOpsAssets', ['ng-admin']);

devOpsAssets.config(['NgAdminConfigurationProvider', function (nga) {
    var admin = nga.application('运维资产管理')
        .baseApiUrl('http://127.0.0.1:8080/');
    var siteNode = nga.entity('siteNodes');
    var site = nga.entity('sites');
    var server = nga.entity('servers');
    var serverAdditionalAttribute = nga.entity('serverAdditionalAttributes');

    var sites = function (nga, admin) {
        site.listView().title('网站管理').fields([
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
        siteNode.listView().title('节点管理').fields([
            nga.field('id'),
            //nga.field('siteId', 'reference')
            //    .targetEntity(site).targetField(nga.field('siteName'))
            //    .label('site_name'),
            nga.field('siteId'),
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
        serverAdditionalAttribute.listView().title('资产属性管理').fields([
            nga.field('id').label('序号'),
            nga.field('serverAdditionalAttributeName').label("属性名称"),
            //todo need a filter to covert serverType here
            nga.field('serverType').label('服务器类型'),
            nga.field('status','choice').choices([
                {value: '1',label:'使用中'},
                {value: '0',label:'不在使用'},
            ]).label('使用状态')
        ]);
        serverAdditionalAttribute.creationView().fields([
            nga.field('serverAdditionalAttributeName').label("属性名称"),
            //todo change choice value  to a index value
            nga.field('serverType','choice').label('服务器类型').choices([
                {value: '物理机',label: '物理机'},{value:'虚拟机',label: '虚拟机'}
                ,{value: 'docker',label:'docker'}
            ]),
            nga.field('status','choice').choices([
                {value: '1',label:'使用中'},
                {value: '0',label:'不在使用'},
            ]).label('使用状态')
        ]);
        serverAdditionalAttribute.editionView().title('编辑属性').fields(serverAdditionalAttribute.creationView().fields());
        serverAdditionalAttribute.showView().title('属性').fields(serverAdditionalAttribute.listView().fields());
        admin.addEntity(serverAdditionalAttribute);
    };

    var server = nga.entity('servers');
    var servers = function (nga, admin) {
        var server = nga.entity('servers');
        server.listView().title('服务器主机管理').fields([
            nga.field('id'),
            nga.field('serverName'),
            nga.field('serverIP'),
            nga.field('serverType'),
            nga.field('serverOS'),
            nga.field('serverMem'),
            nga.field('serverCPU'),
            nga.field('serverHD1'),
            nga.field('serverHD2'),
            nga.field('serverRaidLV'),
            nga.field('serverManagementCardIP'),
            nga.field('serverManagementCardUser'),
            nga.field('serverManagementCardPWD'),
            nga.field('serverManagementCardSN'),
            nga.field('serverAssetNo'),
            nga.field('account'),
            nga.field('accountPassword'),
            nga.field('serverUsageComments'),
            nga.field('status'),
            nga.field('serverAddlValues'),
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

    //menu part
    admin.menu(nga.menu()
        .addChild(nga.menu(server).title('服务器主机管理'))
        .addChild(nga.menu(site).title('网站节点管理'))
        .addChild(nga.menu(siteNode).title('节点管理'))
        .addChild(nga.menu(serverAdditionalAttribute).title('资产属性管理'))
    );
    nga.configure(admin);
}]);