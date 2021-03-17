const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./js/main.js",
    output: {
        path: resolve(__dirname, "build"),
        filename: "js/main.[contenthash].js"
    },
    module: {
        rules: [
            // css
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            // all-file like audio and img
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                    name: "[name].[ext]"
                },
            },
            {
                test: /\.(mp3|ogg|ac3|m4a|caf)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'audio',
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html')
        }),
        // Compression pictures
        new ImageminPlugin({
                test: 'img/**'
            }),
            // bump up the optimization level for all the files in my `bigpngs` directory
            new ImageminPlugin({
                test: 'img/**',
                optipng: {
                    optimizationLevel: 10,
                    name: "[name].[ext]"
                }
            }),
            new BundleAnalyzerPlugin(),

    ]
}