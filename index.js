var axios = require('axios');
var qs = require('qs');
var WinErrorHandler = require('./lib/winErrorHandler.js');
var VueErrorHandler = require('./lib/vueErrorHandler.js');
var SENDERRTIMELINE = null;

function sendLog(options) {
    var error_list = JSON.parse(localStorage.getItem('ERRLIST'));

    localStorage.removeItem('ERRLIST');

    axios({
        method: 'GET',
        url: options.baseUrl,
        headers: {
            'Accept':'application/x-www-form-urlencoded;charset=utf-8'
        },
        timeout: 30000,
        withCredentials: true,
        transformRequest: [function (data) {
            // 发送请求前对 data 进行FormData转换处理
            return qs.stringify(data);
        }], 
        params: Object.assign({}, options.params, {error_list: error_list}),
        data: Object.assign({}, options.params, {error_list: error_list}),
    });
}

//为了优化异常频繁被触发，频繁上报
//先存储本地，再定期上报
function sendLoca(options, params){
    clearTimeout(SENDERRTIMELINE);

    var data = localStorage.getItem('ERRLIST');
    var err_list = data ? JSON.parse(data) : [];

    err_list.push(params);

    localStorage.setItem('ERRLIST', JSON.stringify(err_list));

    SENDERRTIMELINE = setTimeout(function() {
        sendLog(options);
    }, 180000);
}


/*
 * error处理器函数
 * @prama {Object} options 源数据 （必传）
 * @prama {Object} Vue     Vue    
 * 
 * ex: options
 * {
 *   baseUrl: '', //上报异常的请求url  （必传）
 *   params: {} //上报异常的请求参数集 （必传）
 * }
 *
*/
function ErrorHandler(options, Vue) {
    if (!options || options.lenght == 0) {
        console.error('缺少必传参数，参数格式如下：')
        console.log('{\n  baseUrl: "", //上报异常的请求url  （必传）\n  params: {} //上报异常的请求参数集 （必传）\n}')
        return false;
    }

    this.data = options;
    
    WinErrorHandler.init(sendLoca, this.data);

    if (typeof Vue != 'undefined') {
        VueErrorHandler.init(sendLoca, this.data, Vue);
    }
}

export default ErrorHandler






