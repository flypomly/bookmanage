// const { join } = require('path');

// const _ = require('lodash');
import { join } from "path";
import _ from "lodash";
// import { extend } from "lodash.es";

let config = {
    'viewDir': join(__dirname, '..', 'views'),
    'staticDir': join(__dirname, '..', 'assets')
}

if (process.env.NODE_ENV == 'development') {
    const localConfig = {
        baseURL: 'http://192.168.245.128/index.php?r=',
        cacheModel: false,
        port: 3000
    }
    config = _.extend(config, localConfig);
}

if (process.env.NODE_ENV == 'production') {
    const prodConfig = {
        cacheModel:'memory',
        port: 8081
    }
    config = _.extend(config, prodConfig);
}

module.exports = config;