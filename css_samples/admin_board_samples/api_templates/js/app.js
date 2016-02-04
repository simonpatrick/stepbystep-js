/**
 * Created by patrick on 16/2/4.
 */

var Vue = require('vue');
var Router = require('vue-router');
var App = require('./components/container.vue');

//install router
Vue.use(Router);

var router=new Router();
router.map({
    '*':{
        component:require('./components/not-fount.vue')
    },
    '/':{
        component:require('./components/dashboard.vue')
    }
});

router.start(App,'#apiworkspace');
