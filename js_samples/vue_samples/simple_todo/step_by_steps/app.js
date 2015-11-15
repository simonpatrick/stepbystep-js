/**
 * Created by patrick on 15/10/5.
 */
var demo = new Vue({
   el: '#demo',
   data:{
       names: ['simon','patrick','Susan','Michelle']
   },

   //ready: function(){
   //    var that=this;
   //
   //    setInterval(function(){
   //        that.name='Updated';
   //    },2000);
   //},

   methods:{
       addName: function(){
           this.names.push(this.newName)
       },
       onKeyUp: function(){
           alert("key up is fired");
       }
   }
});

var post = new Vue({
   el: '#post',
   data: {
       isVisible: true,
       liked: false,
       likedCount: 10
   },
   methods: {
       toggleLike: function(){
           this.liked=!this.liked;
           this.liked?this.likedCount++:this.likedCount--;
       }
   }
});


var filterData= new Vue({
    el:'#filterData',
    data:{
        sortKey:'',
        reverse: false,
        search:'',
        columns:['name','age'],
        people:[
            {name:'john',age:'20'},
            {name:'simon',age:'34'},
            {name:'patrick',age:'54'},
            {name:'michelle',age:'26'},
            {name:'curry',age:'29'},
            {name:'mark',age:'22'}
        ]
    },
    filters:{
        computedAge: function(people,age){
            return people.filter(function(person){
                person.age%10;
            });
        }
    },
    methods:{
        sortBy: function(sortKey){
            console.log(sortKey);
            this.reverse=(this.sortKey==sortKey)? !this.reverse:false;
            console.log(this.reverse);
            this.sortKey=sortKey;
        }
    }
});

var tableRender=new Vue({
    el:'#tableRender',
    data:{
        parentMsg: 'Hello',
        items:[
            {childMsg: 'Foo'},
            {childMsg: 'Bar'}
        ]
    }
});