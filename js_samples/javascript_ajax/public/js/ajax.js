/**
 * Created by patrick on 15/10/1.
 */
// AJAX请求的基本过程
// 1.创建XMLHttpRequest对象
// 1+. 请求发起前的一些处理逻辑
// 2.open，设置各类属性,method, async, url, url param data
// 2+. 设置请求头
// 3.send, post data
// 4.success, error, alwarys callback
// 5.timeout callback

// AJAX请求的基本过程
// 1.创建XMLHttpRequest对象
// 1+. 请求发起前的一些处理逻辑
// 2.open，设置各类属性,method, async, url, url param data
// 2+. 设置请求头
// 3.send, post data
// 4.success, error, alwarys callback
// 5.timeout callback

// 对过程进行分析整理，抽象出一个更符合业务处理习惯的过程逻辑
// 1. 初始化一个对象，初始时就通过参数指定请求是同步还是异步，默认异步
// 2. 如果需要自定义请求头，对象提供header或headers方法来设置头
// 3. 如果需要做一些前置处理操作，提供一个before方法，参数为要前置执行的function
// 4. 请求方法名决定使用的是哪种method提交请求，支持get, post，可扩展,此类方法执行后，请求被发起
// 5. 提供success方法用来绑定readystate==4 && status==200时的回调处理函数，回调函数参数为responseText或JSON
//    success时试图将返回结果转json，如果成功，参数为转换后的json对象，否则为string
//	     如果 success方法指定了第二个参数为true，表示结果必须为正确的json，如果转换失败，会触发error回调
// 6. 提供error方法用来绑定readystate == 4 && status != 200 时的回调，回调参数为status, responseText,xhr
// 7. 提供alwarys方法用来绑定 readyState == 4时的回调 ，不管status为任何值，回调参数status, responseText,xhr
// 8. 提供timeout方法设定超时时间并绑定超时处理函数

// ajax([sync=false])
//	.before(callback(xhr))
//  .header(name, value)
//  .headers({headers})
//  .get|post|other(url, [data], [contentType])
//  .success(callback(retData, xhr), [jsonForceValidate=false])
//  .error(callback(statusCode, responseText, xhr))
//  .always(callback(statusCode, responseText, xhr))
//  .timeout(timeout, [callback(xhr)])

// 所有方法返回的都是一个对象，其中有abort方法，用于在连接请求时中止前一个请求

// 调用示例,获取用户列表
//ajax().get('/users').success(fucntion(data) {
//	con/sole.log(data);
//	console.log(typeof data);
//});

// 调用示例2，新增用户操作
//ajax().post('/addUser', {
//	uid: '001',
//	uname: '张三',
//	account: 'zs',
//	password: '123'
//}).success(function(isOk) {
//	if(！isOk) {
//		alert('保存失败，请重试');
//	} else {
//		alert('保存成功！');
//	}
//}).error(function() {
//	alert('保存失败，请重试');
//});
// 调用示例3， 有前置处理方法
//ajax().before(function(xhr) {
//	xhr.loader = new Loader();
//	loader.loading('正在加载数据，请稍候...');
//}).get('/users', {pageIndex: 3, pageSize: 10}).success(function(users) {
//	console.log(users);
//}).always(fucntion(status, resText, xhr) {
//	xhr.loader.close();
//  delete xhr.loader；
//});

(function () {
    window.ajax = function (sync) {
        var _obj = {
            xhr: createXHR(),
            async: !sync
        };

        /**
         * before method
         * @param name
         * @param value
         * @returns {{xhr: *, async: boolean}}
         */
        _obj.before = function (name, value) {
            _obj.xhr.setRequestHeder(name, value);
            return _obj;
        };

        /**
         * set header
         */
        _obj.header(name, value)
        {
            _obj.xhr.setRequestHeader(name, value);
            return _obj;
        }

        /**
         * set headers
         * @param headers
         * @returns {{xhr: *, async: boolean}}
         */
        _obj.headers = function (headers) {
            if (Object.prototype.toString.call(headers) === '[object Object]') {
                for (var name  in headers) {
                    _obj.xhr.setRequestHeader(name, value);
                }
            }

            return _obj;
        }

        /**
         * callback when successful
         * @param callback
         * @param jsonForceValidate
         * @returns {{xhr: *, async: boolean}}
         */
        _obj.success = function (callback, jsonForceValidate) {
            _obj.jsonForceValidate = jsonForceValidate;
            if (typeof(callback) === 'function') {
                _obj.successCallBack = callback;
            }

            return _obj;
        }

        /**
         * callback when error
         * @param callback
         * @returns {{xhr: *, async: boolean}}
         */
        _obj.error = function (callback) {
            if (typeof(callback) === 'function') {
                _obj.errorCallBack = callback
            }

            return _obj;
        }

        /**
         * call back binding
         * @param callback
         * @returns {{xhr: *, async: boolean}}
         */
        _obj.always = function (callback) {
            if (typeof (callback) === 'function') {
                _obj.alwaysCallBack = callback
            }

            return _obj;
        }

        /**
         * timeout binding
         * @param timeout
         * @param callback
         */
        _obj.timeout = function (timeout, callback) {
            _obj.xhr.timeout = timeout;
            if (typeof(callback) === 'function') {
                callback(_obj.xhr);
            }
            return _obj;
        }

        _obj.get = function (url, data) {
            if (typeof(url) === 'undefined') throw 'url 不能为空';
            if (Object.prototype.toString().call(data) !== '[object Object]') data = undefined;
            doAjax(_obj, 'get', url, data, 'urlencoded');
        }

        _obj.post = function (url, data, contentType) {
            if (typeof(url) === 'undefined') throw 'url 不能为空';
            if (Object.prototype.toString().call(data) !== '[object Object]') data = undefined;
            if (typeof(contentType) !== 'string') contentType = 'urlencoded';
            doAjax(_obj, 'post', url, data, contentType);
        }

        _obj.abort = function () {
            _obj.xhr.abort();
        };

        return _obj;
    };

    function createXhr() {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {
                }
            }
        }

        return xhr;
    }

    function doAjax(_obj, method, url, data, contentType) {
        var xhr = _obj.xhr;
        data = encodeData(data, contentType);
        // 如果是get请求，将编码后的data做为查询参数附加到url上
        if ('get' === method) {
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
        }

        // 绑定事件处理器
        bindEventHandler();

        // open
        xhr.open(method, url, _obj.async);

        // send
        if ('post' === method && data) {
            xhr.setRequestHeader('Content-Type', _obj.postContentType);
            xhr.send(data);
        } else {
            xhr.send();
        }

        /*
         * 对数据进行编码
         * @param {Object} data
         * @param {String} contentType urlencoded|json
         */
        function encodeData(data, contentType) {
            if (Object.prototype.toString.call(data) === '[object Object]') {
                // 此处需要json转字符串，现代浏览器都支持内置的JSON对象，如果老浏览器不支持，可通过使用json2.js来模拟实现
                if ('json' === contentType.toLowerCase() // 以application/json格式post数据
                    && typeof(JSON) === 'object' // 支持JSON序列化
                    && typeof(JSON.stringify) === 'function') {

                    _obj.postContentType = 'application/json';
                    return JSON.stringify(data);
                } else {
                    // 其它所有情况都做为urlencoded处理
                    _obj.postContentType = 'application/x-www-form-urlencoded';
                    return encodeParam(data);
                }
            }
        }


        function bindEventHandler() {
            xhr.onreadystatechange = function () {
                // 仅当请求完成时执行处理
                if (xhr.state == 4) {
                    // 如果有always回调，先执行always
                    _obj.alwaysCallback && _obj.alwaysCallback(xhr.status,
                        xhr.responseText, xhr);

                    // 根据是否成功，决定调用success or error
                    var resText = xhr.responseText;
                    var resJson = toJson(resText);

                    if (xhr.status == 200) {
                        if (_obj.jsonForceValidate && typeof(resJson) === 'undefined') {
                            // 强制json格式验证且转换失败，触发errorCallback
                            _obj.errorCallback && _obj.errorCallback(xhr.status,
                                xhr.responseText, xhr);
                        } else {
                            _obj.successCallback && _obj.successCallback(resJson || resText,
                                xhr);
                        }
                    } else {
                        // 非 200 状态调用errorCallback
                        _obj.errorCallback && _obj.errorCallback(xhr.status, xhr.responseText, xhr);
                    }
                }
            }
        }
    }

    /*
     * 转JSON
     * @param {String} text
     */
    function toJson(text) {
        var json;
        try {
            // 尝试将结果转为JSON对象
            // 优先使用JSON.parse，如果浏览器不支持内置JSON对象，则以eval方式执行
            if (typeof(JSON) === 'object' && typeof(JSON.parse) === 'function') {
                json = JSON.parse(text);
            } else {
                json = eval(text);
            }
        } catch (e) {
        }

        return json;
    }

    /*
     * 以urlencoded方式编码数据
     * @param {Object} data
     */
    function encodeParam(data) {
        if (Object.prototype.toString.call(data) == '[object Object]') {
            var params = [];
            for (var name in data) {
                var value = data[name];
                if (Object.prototype.toString.call(value) === '[object Array]') {
                    // 如果是数组，需要组装成paraName=v1&paraName=v2这样的形式，便于后台以数据格式接收数据
                    for (var i = 0; i < value.length; ++i) {
                        params.push(name + '=' + encodeURIComponent(value[i]));
                    }
                } else {
                    params.push(name + '=' + encodeURIComponent(data[name]));
                }
            }

            return params.join('&');
        }
    }

})();
