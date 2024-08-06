const path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'ds.js',
        path: path.resolve(__dirname, 'js'),
    },
    mode: 'development', // or 'production'
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};