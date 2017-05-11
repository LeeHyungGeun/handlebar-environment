/*eslint-disable no-console */
import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devtool: 'cheap-module-polyfill',
    context: path.join(__dirname, '../src/'),
    entry: {
        hmr: [
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client?reload=true',    // note that it reload the page it hot module reload    
        ],
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
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader'
                    }
                ]
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
        new webpack.HotModuleReplacementPlugin(),   // enable HMR globally
        new webpack.NamedModulesPlugin(),   // pritns more readable module names in the browser
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'hmr',
            minChunks: Infinity
        }),
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
            // chunk: ['commons', 'home'],
            chunks: ['hmr', 'home'],
            inject: 'body',
            filename: 'home.html',
            template: 'index.html'
        })
    ]
};