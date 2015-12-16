/**
 * Created by patrick on 15/12/16.
 */

Vue.component('demo-grid',{
   template: '#grid-template',
   replace: true,
   props:{
       data: Array,
       columns: Array,
       filterKey: String
   },

    data: function(){
        var sortOrders ={};
        this.columns.forEach(function(key){
           sortOrders[key]=1
        });
        return {
            sortKey: '',
            sortOrders: sortOrders
        }
    },
    methods:{
        sortBy:function(key){
            console.log(key)
            this.sortKey=key;
            console.log(this.sortOrders[key])
            this.sortOrders[key]=this.sortOrders[key]*-1;
        }
    }
});

var coderepos= new Vue({
   el: '#coderepos',
   data: {
       searchQuery: '',
       columns: ['author','category','language','location'],
       repos: [
           { author: 'hustcc', category: 'redis' ,language:'PYTHON',location:'https://github.com/hustcc/redis-monitor.git'}
       ]
   }
});