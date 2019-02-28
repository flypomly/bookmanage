const errorHandle = {
    error(app, logger){
        app.use(async(ctx,next)=>{
            try{
                await next();
            }catch(error){
                console.log(error);
                ctx.status = 500;
                logger.error(error);
                ctx.body = '出错了';
            }
        })
        app.use(async(ctx, next)=>{
            await next();
            if(ctx.status != 404){
                return;
            }
            ctx.status = 200;
            ctx.body = '<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone_v6/lostchild/search_children.js"></script>';
        })
    }
}

module.exports = errorHandle;