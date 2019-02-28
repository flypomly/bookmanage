/**
 * @fileoverview 实现index的数据模型
 * @author Flypmly
 */

 const SafeRequest = require('../utils/SafeRequest');
/**
 * Index类获取后台关于图书的数据
 * @class
 */
class Index{
    /**
     * @constructor
     * @param {string} app Koa2的执行上下文
     */
    constructor(app){

    }
    /**
     * 获取后台全部图书的数据方法
     * @param {*} options 配置项
     * return new Promise
     * getData(options)
     */
    getData(options){
        const safeRequest = new SafeRequest('books/list');
        return safeRequest.fetch({});
    }
    /**
     * 保存图书的数据方法
     * @param {*} options 配置项
     * return new Promise
     * saveData(options)
     */
    saveData(options){
        const safeRequest = new SafeRequest('books/create');
        return safeRequest.fetch({
            method: 'POST',
            params: options.params
        });
    }
}

module.exports = Index;