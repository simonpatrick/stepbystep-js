/**
 * Created by patrick on 15/11/16.
 */
(function(){
    chrome.devtools.inspectedWindow.eval(
        'Meteor.release',
        function (result, isException) {
            document.body.appendChild(document.createTextNode(
                'Meteor.release = ' + result));
        });
})();
