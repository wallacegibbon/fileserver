const koaBody = require('koa-body')
const config = require('./config')
const router = require('koa-router')({ prefix: config.prefix })
const interface = require('./interface')

router.get('/', interface.dispMainPage)
router.get('/download/:fname', interface.handleDownload)
router.post('/upload', koaBody({ multipart: true }), interface.handleUpload)

module.exports = router.routes()
