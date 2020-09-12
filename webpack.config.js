const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const devMode = process.env.NODE_ENV === 'development' && false;

const moduleBabelSetUp = {
    // test: /\.js$/,
    // exclude: /node_modules/,
    // loader: 'babel-loader'
}

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules:[
            moduleBabelSetUp,
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }

        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify:false
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ]
};
