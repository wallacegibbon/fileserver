const config = require('./config')
const Koa = require('koa')
const router = require('./router')
const os = require('os')

async function initialize(ctx, next)
{
	console.log(`Recevied request from ${ctx.ip}: ${ctx.method} "${ctx.path}"`)
	const start = Date.now()
	try
	{
		await next()
	}
	catch (err)
	{
		ctx.body = err.message
	}
	finally
	{
		calcTime(ctx, start)
	}
}

function calcTime(ctx, start)
{
	const milliseconds = Date.now() - start
	ctx.set('X-Response-Time', `${milliseconds}ms`)
	console.log(`total time cost: ${milliseconds}ms`)
}

function getIpAddresses()
{
	return Object.values(os.networkInterfaces()).flat(1)
		.map(({ address }) => address)
		.filter(x => ['::1', '127.0.0.1'].indexOf(x) === -1)
}

function checkArguments()
{
	const [ port, dir ] = process.argv.slice(2)
	if (port)
	{
		config.port = Number(port)
	}
	if (dir)
	{
		config.location = dir + '/'
	}
}

async function start()
{
	checkArguments()
	const app = new Koa({ proxy: true })
	app.use(initialize)
	app.use(router)
	const ipAddrs = getIpAddresses().join(', ')
	console.log(`Listening on port ${config.port} of ${ipAddrs} ...`)
	app.listen(config.port)
}

start().catch(console.error)
