const path = require('path');

module.exports = {
    entry: './app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use:[
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        publicPath: '/dist/'
    }
};
