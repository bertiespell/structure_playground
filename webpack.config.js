const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ["./ts/index.ts"],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new CopyWebpackPlugin([
            { from: 'assets' }
        ])
	]
};
