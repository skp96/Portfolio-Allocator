const path = require('path');

module.exports = {
    context: __dirname,
    entry: ['babel-polyfill','./src/index.js'],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
            }
        ]
    },
    devtool: 'eval-source-map'
};