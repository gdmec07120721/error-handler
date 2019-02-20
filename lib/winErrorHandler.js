var WinErrorHandler = {};

WinErrorHandler.init = function(callback, options) {
    window.onerror = function(message, source, lineno, colno, error) {
        var error_arr = error.stack.toString().split(/\n/);
        var params = {
            error: error_arr[1],
            msg: message,
            date: new Date().toLocaleString()
        };

        callback(options, params);
    }
}

module.exports = WinErrorHandler