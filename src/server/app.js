const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const co = require('co');
const render = require('koa-swig');
const log4js = require('log4js');
const errorHandle = require('./middlewares/errorHandle');
const config = require('./config');
//process.env.NODE_ENV
app.use(serve(config.staticDir));
app.context.render = co.wrap(render({
    root: path.join(config.viewDir),
    autoescape: true,
    cache: config.cacheModel, // disable, set to false
    cache: false, // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));
//逻辑和业务错误 http日志
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
errorHandle.error(app, logger);
require('./controllers')(app);
app.listen(config.port, () => {
    console.log('Server is started');
})