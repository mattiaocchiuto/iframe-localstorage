;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'jquery'], function (_, $) {
            factory(_, $);
        });
    } else if (typeof exports !== 'undefined') {
        factory(require('underscore'), require('jquery');
    } else {
        factory(root._, root.jQuery);
    }
}(this, function (_, $) {
    'use strict';

    var LocalStorage_proxy = (function () {
        var fn = 'localStorage',
            callback_map = {},
            datas = {};

        var _postMessage = function (msg) {
            var deferred = new $.Deferred(),
                callback = function (value) {deferred.resolve(value); };

            try {
                parent.postMessage(msg, "*");
                callback_map[msg.id] = callback;
                
                return deferred;
            } catch (e) {}
        };

        var _genId = function () {
            return Math.round(Math.random() * 1000);
        };

        var _messageListener = (function () {
            var eventMethod     = window.addEventListener ? "addEventListener" : "attachEvent",
                eventer         = window[eventMethod],
                messageEvent    = (eventMethod === "attachEvent") ? "onmessage" : "message";

            eventer(messageEvent, function (e) {
                var response = e.data.response,
                    id = e.data.id;

                if (callback_map[id]) {
                    callback_map[id](response);
                    callback_map = _.omit(callback_map, id);
                }
            }, false);
        }());

        return {
            setItem: function (key, value) {
                if (typeof key === 'undefined'){
                    throw "A key is required";
                }
                
                var data = {};
                data.fn = fn;
                data.method = 'setItem';
                data.key = key;
                data.value = value || undefined;
                data.id = _genId();

                datas[key] = value;

                return _postMessage(data);
            },

            getItem: function (key) {
                if (typeof key === 'undefined'){
                    throw "A key is required";
                }
                
                var data = {};
                data.fn = fn;
                data.method = 'getItem';
                data.key = key;
                data.id = _genId();

                return _postMessage(data);
            },

            removeItem: function (key) {
                if (typeof key === 'undefined'){
                    throw "A key is required";
                }
                
                var data = {};
                data.fn = fn;
                data.method = 'removeItem';
                data.key = key;
                data.id = _genId();

                datas = _.omit(datas, key);

                return _postMessage(data);
            }
        };
    }());
    
    (function () {
        if (window.self !== window.top) {
            Storage.prototype.setItem = LocalStorage_proxy.setItem;
            Storage.prototype.getItem = LocalStorage_proxy.getItem;
            Storage.prototype.removeItem = LocalStorage_proxy.removeItem;
        }
    }());
}));