/**
 * Created by patrick on 15/11/11.
 */
new Vue({
    el: '#testresult',
    data: {
        testsuites: [
            {name:"Name1",cases:100,isPass:true,passed:100,failed:10,testCases:[{
                name: "test1",
                isPass: true,
                logs:["testlogging1","testlog2"]
            }]},
            {name:"Name2",cases:100,isPass:true,passed:100,failed:10,testCases:[{
                name: "test2",
                isPass: true,
                logs:["testlogging1","testlog2"]
            }]},
            {name:"Name3",cases:100,isPass:true,passed:100,failed:10,testCases:[{
                name: "test3",
                isPass: false,
                logs:["testlogging1","testlog2"]
            }]}]
    },
    methods: {
    }
});