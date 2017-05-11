/*eslint-disable no-console */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import htmlWebpackPlugin from 'html-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    devtool: 'source-map',
    context: path.join(__dirname, '../src/'),
    entry: {
        home: './js/home.js'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
             {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline'
                            }
                        }
                    ]
                })
             },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.handlebars$/,
                use: [
                    'handlebars-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons'
        // }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new htmlWebpackPlugin({
            title: 'Home',
            minify: {
                collapseWhitespace: false,
                removeComments: false
            },
            hash: true,
            chunks: ['home'],
            inject: 'body',
            filename: 'home.html',
            template: 'index.html'
        })
    ]
};