const fetch = require('node-fetch');
const config = require('../config');

class SafeRequest {
    constructor(url) {
        this.url = url;
        this.baseURL = config.baseURL;
    }

    fetch(options) {
        let myFetch = fetch(this.baseURL + this.url);
        if (options && options.params) {
            myFetch = fetch(this.baseURL + this.url, {
                method: options.method,
                body: options.params
            });
        }
        return new Promise((resolve, reject) => {
            let result = {
                code: 0,
                msg: '',
                data: []
            }
            myFetch
                .then(res => res.json())
                .then((json) => {
                    result.data = json;
                    resolve(result);
                }).catch((error) => {
                    console.log(error);
                    result.code = 1;
                    result.msg = 'node-fetch和后端通信异常(╥╯^╰╥)';
                    reject(result);
                })
        });
    }
}

module.exports = SafeRequest;