const config = require('./config')

function genMainPage(files)
{
	return `<!doctype html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="utf-8">
</head>
<body style="max-width: 600px; margin: auto; padding: 10px;">
	<div class="upload-part">
		<form action="${config.prefix}/upload" method="POST"
				enctype="multipart/form-data">
			<input type="file" name="myfile">
			<input type="submit" value="transmit">
		</form>
	</div>
	<div class="download-part">
		<ul>
			${prepareFiles(files)}
		</ul>
	</div>
</body>
</html>`
}

function prepareFiles(files)
{
	const dPrefix = `${config.prefix}/download`
	return files.map(f => `<li><a href="${dPrefix}/${f}">${f}</a></li>`)
		.join('\n')
}

module.exports = {
	genMainPage,
}