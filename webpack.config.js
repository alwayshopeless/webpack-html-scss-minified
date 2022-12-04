const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
}

const plugins = [
    // new MiniCssExtractPlugin({
    //     filename: '[name].[contenthash].css',
    // }),
];

if (process.env.SERVE) {
}

module.exports = {
    mode,
    target,
    plugins,
    devtool: 'source-map',
    entry: [
        './resources/js/src/main.js',
        __dirname + "/resources/scss/style.scss"
    ],

    devServer: {
        static: './public',
        hot: true,
        allowedHosts: "all",
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    },

    output: {
        path: path.resolve(__dirname, 'public/js'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    // 'style-loader',
                    // 'css-loader',
                    {
                        loader: "file-loader",
                        options: {outputPath: "../css", name: "[name].min.css"},
                    },
                    "sass-loader"
                ],
            },
            // {
            // //     // test: /\.scss$/,
            //     test: /\.s[ac]ss$/i,
            //     exclude: /node_modules/,
            //
            //     use: [
            //         "style-loader",
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 url: false,
            //             },
            //         },
            //         {
            //             loader: "file-loader",
            //             options: { outputPath: "../css", name: "[name].min.css" },
            //         },
            //
            //         {
            //             loader: "sass-loader",
            //         },
            //
            //     ],
            // },
            {test: /\.(html)$/, use: ['html-loader']},
            // {
            //     test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
            //     type: mode === 'production' ? 'asset' : 'asset/resource',
            // },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: {removeAll: true},
                        },
                    ],
                },
            }),
        ],
    },
};
