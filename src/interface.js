const fs = require('fs')
const page = require('./page')
const config = require('./config')

async function dispMainPage(ctx, next)
{
	const files = await fs.promises.readdir(config.location)
	ctx.body = page.genMainPage(files)
	await next()
}

async function handleDownload(ctx, next)
{
	ctx.body = fs.createReadStream(`${config.location}/${ctx.params.fname}`)
	await next()
}

async function handleUpload(ctx, next)
{
	const f = ctx.request.files.myfile
	await fs.promises.copyFile(f.path, `${config.location}/${f.name}`)
	ctx.redirect(config.prefix)
	await next()
}

module.exports = {
	handleDownload,
	handleUpload,
	dispMainPage,
}