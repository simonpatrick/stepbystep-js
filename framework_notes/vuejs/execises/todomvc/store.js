/**
 * Created by patrick on 16/2/4.
 */
(function (exports) {

    'use strict';

    var STORAGE_KEY = 'todos-vuejs';

    exports.todoStorage = {
        fetch: function () {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        },
        save: function (todos) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    };

})(window);