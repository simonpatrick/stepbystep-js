/**
 * Created by patrick on 15/10/5.
 */
new Vue({
    el:'#task',
    data:{
        tasks: [],
        newTask: '',
        filters:{
            inProcess: function(task){
                return !task.completed;
            },
            completed: function(task){
                return task.completed;
            }
        }
    },

    computed:{
        completions:function(){
            return this.tasks.filter(this.filter.completed);
        },
        remaining:function(){
            return this.tasks.filter(this.filters.inProcess);
        }
    },
    methods:{
        addTask: function(e){
            e.preventDefault();
            if(!this.newTask) return;
            this.task.push({
                body: this.newTask,
                completed:false
            });

            this.newTask='';
        },

        editTask: function(task){
            this.removeTask(task);
            this.newTask=body;
            this.$$.newTask.focus();
        },

        toggleTaskComplete: function(task){
            task.completed=!task.completed;
        },

        completeAll: function(){
            this.tasks.forEach(function(task){
                task.completed=true;
            })
        },

        clearCompleted: function(){
            this.tasks=this.tasks.filter(this.filter.inProcess);
        },

        removeTask: function(task){
            this.tasks.$remove(task);
        }
    }
});