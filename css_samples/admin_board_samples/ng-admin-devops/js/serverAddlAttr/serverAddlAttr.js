/**
 * Created by patrick on 16/2/16.
 */

var serverAddlAttrs = function (nga, admin) {
    serverAddlAttr.listView().title('资产属性管理').fields([
        nga.field('id').label('序号'),
        nga.field('serverAddlAttrName').label("属性名称"),
        //todo need a filter to covert serverType here
        nga.field('serverType').label('服务器类型'),
        nga.field('status', 'choice').choices([
            {value: '1', label: '使用中'},
            {value: '0', label: '不在使用'},
        ]).label('使用状态')
    ]);
    serverAddlAttr.creationView().fields([
        nga.field('serverAddlAttrName').label("属性名称"),
        //todo change choice value  to a index value
        nga.field('serverType', 'choice').label('服务器类型').choices([
            {value: '物理机', label: '物理机'}, {value: '虚拟机', label: '虚拟机'}
            , {value: 'docker', label: 'docker'}
        ]),
        nga.field('status', 'choice').choices([
            {value: '1', label: '使用中'},
            {value: '0', label: '不在使用'},
        ]).label('使用状态')
    ]);
    serverAddlAttr.editionView().title('编辑属性').fields(serverAddlAttr.creationView().fields());
    serverAddlAttr.showView().title('属性').fields(serverAddlAttr.listView().fields());
    admin.addEntity(serverAddlAttr);
};