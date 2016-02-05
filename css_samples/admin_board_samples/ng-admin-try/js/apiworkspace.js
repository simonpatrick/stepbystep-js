/**
 * Created by patrick on 16/2/5.
 */
'use strict';

// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('apiWorkspace', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('API Testing Workspace')
        .baseApiUrl('http://jsonplaceholder.typicode.com/'); // main API endpoint;
    // more configuation here later
    //listView      => GET    /users
    //creationView  => POST   /users
    //showView      => GET    /users/:id
    //editionView   => PUT    /users/:id
    //deletionView  => DELETE /users/:id
    // ...
    // attach the admin application to the DOM and execute it
    var user = nga.entity('users'); // the API endpoint for users will be 'http://jsonplaceholder.typicode.com/users/:id
    user.listView()
        .fields([
            nga.field('name').isDetailLink(true),
            nga.field('username'),
            nga.field('email')
        ]);
    user.creationView().fields([
        nga.field('name')
            .validation({ required: true, minlength: 3, maxlength: 100 }),
        nga.field('username')
            .attributes({ placeholder: 'No space allowed, 5 chars min' })
            .validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{5,20}' }),
        nga.field('email', 'email')
            .validation({ required: true }),
        nga.field('address.street')
            .label('Street'),
        nga.field('address.city')
            .label('City'),
        nga.field('address.zipcode')
            .label('Zipcode')
            .validation({ pattern: '[A-Z\-0-9]{5,10}' }),
        nga.field('phone'),
        nga.field('website')
            .validation({ validator: function(value) {
                if (value.indexOf('http://') !== 0) throw new Error ('Invalid url in website');
            } })
    ]);
    user.editionView().fields(user.creationView().fields());
    admin.addEntity(user)

    var post = nga.entity('posts'); // the API endpoint for users will be 'http://jsonplaceholder.typicode.com/users/:id
    post.readOnly();
    post.listView()
        .fields([
            nga.field('title').isDetailLink(true),
            nga.field('body', 'text')
                .map(function truncate(value) {
                    if (!value) return '';
                    return value.length > 50 ? value.substr(0, 50) + '...' : value;
                }),
            nga.field('userId', 'reference')
                .targetEntity(user)
                .targetField(nga.field('username'))
                .label('Author')
        ])
        .listActions(['show'])
        .batchActions([])
        .filters([
            nga.field('q')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('userId', 'reference')
                .targetEntity(user)
                .targetField(nga.field('username'))
                .label('User')
        ]);
    post.showView().fields([
        nga.field('title'),
        nga.field('body', 'text'),
        nga.field('userId', 'reference')
            .targetEntity(user)
            .targetField(nga.field('username'))
            .label('User'),
        nga.field('comments', 'referenced_list')
            .targetEntity(nga.entity('comments'))
            .targetReferenceField('postId')
            .targetFields([
                nga.field('email'),
                nga.field('name')
            ])
            .sortField('id')
            .sortDir('DESC'),
    ]);
    admin.addEntity(post)

    admin.menu(nga.menu()
        .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(post).icon('<span class="glyphicon glyphicon-pencil"></span>'))
    );
    admin.dashboard(nga.dashboard()
        .addCollection(nga.collection(post)
            .name('recent_posts')
            .title('Recent posts')
            .perPage(5) // limit the panel to the 5 latest posts
            .fields([
                nga.field('published_at', 'date').label('Published').format('MMM d'),
                nga.field('title').isDetailLink(true).map(truncate),
                nga.field('views', 'number')
            ])
            .sortField('published_at')
            .sortDir('DESC')
            .order(1)
        )
        .addCollection(nga.collection(post)
            .name('popular_posts')
            .title('Popular posts')
            .perPage(5) // limit the panel to the 5 latest posts
            .fields([
                nga.field('published_at', 'date').label('Published').format('MMM d'),
                nga.field('title').isDetailLink(true).map(truncate),
                nga.field('views', 'number')
            ])
            .sortField('views')
            .sortDir('DESC')
            .order(3)
        )
        .addCollection(nga.collection(comment)
            .title('Last comments')
            .perPage(10)
            .fields([
                nga.field('created_at', 'date')
                    .label('Posted'),
                nga.field('body', 'wysiwyg')
                    .label('Comment')
                    .stripTags(true)
                    .map(truncate)
                    .isDetailLink(true),
                nga.field('post_id', 'reference')
                    .label('Post')
                    .map(truncate)
                    .targetEntity(post)
                    .targetField(nga.field('title').map(truncate))
            ])
            .sortField('created_at')
            .sortDir('DESC')
            .order(2)
        )
        .addCollection(nga.collection(tag)
            .title('Tags publication status')
            .perPage(10)
            .fields([
                nga.field('name'),
                nga.field('published', 'boolean').label('Is published ?')
            ])
            .listActions(['show'])
            .order(4)
        )
    );
    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            // custom pagination params
            if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
                params._sort = params._sortField;
                params._order = params._sortDir;
                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
    });
}]);
