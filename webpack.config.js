const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm


module.exports = {
	mode: 'production',
	entry: {
		"app": './index.js',
		// "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js'
		// "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		// "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		// "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		// "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
	},
	output: {
		globalObject: 'this',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist/')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use:  [
					'style-loader',
					'css-loader'
				],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template:path.resolve(__dirname, 'index.html'),
				filename: path.join('.', 'index.html')
			}
			)
	],
};

