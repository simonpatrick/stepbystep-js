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
           { author: 'Chuck Norris', category: Infinity,language:'JAVA',location:'URL'},
           { author: 'Bruce Lee', category: 9000 ,language:'JAVA',location:'URL'},
           { author: 'Jackie Chan', category: 7000 ,language:'JAVA',location:'URL'},
           { author: 'Jet Li', category: 8000 ,language:'JAVA',location:'URL1'}
       ]
   }
});