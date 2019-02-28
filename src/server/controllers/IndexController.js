const Index = require('../models/Index');
const { URLSearchParams } = require('url');
class IndexController {
    constructor() { }
    actionIndex() {
        return async (ctx, next) => {
            // ctx.body = 'hello'
            const index = new Index();
            const result = await index.getData();
            //SSR 服务器渲染
            ctx.body = await ctx.render("books/pages/list", {
                data: result.data
            });
        };
    }
    actionAdd() {
        return async (ctx, next) => {
            ctx.body = await ctx.render("add");
        };
    }

    actionSave() {
        return async (ctx, next) => {
            const index = new Index();
            console.log(ctx.request.search);
            const params = new URLSearchParams(ctx.request.search);
            // params.append("Books[name]", "dsfsdfsdf");
            // params.append("Books[ISBN]", "sadfsagdfgdf");
            // params.append("Books[author]", "sdafs");
            // params.append("Books[press]", "sadfsadf");
            // params.append("Books[publication_date]", "2019-01-15");
            // params.append("Books[introduction]", "sdfsadfasf");
            // params.append("Books[remarks]", "sdffdh");
            // params.append("Books[price]", "11.33");
            console.log(params);
            const result = await index.saveData({
                params
            })
            ctx.body = result;
        }
    }
}

module.exports = IndexController;