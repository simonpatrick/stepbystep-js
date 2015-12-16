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
       columns: ['author','category','language','location','description'],
       repos: [
           { author: 'hustcc', category: 'devops' ,language:'PYTHON',location:'https://github.com/hustcc/redis-monitor.git'
               ,description:'a repo for monitoring redis server'},
           { author: 'chihongze', category: 'devops' ,language:'PYTHON',location:'https://github.com/chihongze/shard.py.git'
               ,description:'sharding python operation samples'},
           { author: 'daikeren', category: 'collections' ,language:'PYTHON,JS',location:'https://github.com/daikeren'
               ,description:'python,javascript learning repositories'},
           { author: 'daikeren', category: 'collections' ,language:'PYTHON,JS',location:'https://github.com/binux/pyspider.git'
               ,description:'python learning repositories'},
           { author: 'binux', category: 'web crawler' ,language:'PYTHON',location:'https://github.com/binux/pyspider.git'
               ,description:'a web crawler repository'},
           { author: 'Panblack', category: 'devops' ,language:'SHELL',location:'https://github.com/Panblack/ezdpl.git'
               ,description:'shell script for deployment'},
           { author: 'Shougo', category: 'devops' ,language:'VIM',location:'https://github.com/Shougo/unite.vim'
               ,description:'The unite or unite.vim plug-in can search and display information'},
           { author: 'Runscope', category: 'devops' ,language:'PYTHON',location:'https://github.com/Runscope/httpbin'
               ,description:'HTTP Request & Response Service, written in Python + Flask'
           },{ author: 'code4craft', category: 'devops' ,language:'JAVA',location:'https://github.com/code4craft/blackhole'
               ,description:'BlackHole是一个Java编写的DNS服务器'
           }
       ]
   }
});