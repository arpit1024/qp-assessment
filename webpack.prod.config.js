const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './app.ts',
    devtool: 'source-map',
    target: 'node',
    resolve: { extensions: ['.ts', '.js', '.json', '.jsx', '.tsx'] },
    stats: "errors-only",
    externals: [nodeExternals()],
    optimization: {
        minimize: true
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};
