var VueErrorHandler = {};

VueErrorHandler.init = function(callback, options, Vue) {
    Vue.config.errorHandler = function (err, vm, info) {
        var error_arr = err.stack.toString().split(/\n/);
        var params = {
            error: error_arr[0] + error_arr[1],
            msg: info,
            date: new Date().toLocaleString()
        };

        callback(options, params);
    }
}

module.exports = VueErrorHandler
