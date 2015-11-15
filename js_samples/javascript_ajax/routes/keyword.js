/**
 * Created by patrick on 15/10/1.
 */

var experss = require('express');
var router = experss.Router();

var TEST_DATA = ['java', 'c#', 'testing', 'ruby',
    'python', 'java web', 'express'];

router.all('/hit', function (req, resp) {
    var keyword = req.query.keyword;
    if (!keyword) {
        keyword = req.body.keyword;
    }
    console.log('keyword:'+keyword);
    var retList = select(keyword);
    resp.json(retList)
});

function select(keyword) {
    var ret = [];
    if (keyword) {
        keyword = keyword.toLowerCase();
        TEST_DATA.forEach(function(element,index){
            console.log(element);
            if(element.toLowerCase().indexOf(keyword)>=0){
                ret.push(element);
            }
        });
    }

    return ret;
}

module.exports=router